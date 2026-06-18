import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    public senhasService: SenhasService,
    private toastController: ToastController
  ) {}

  async chamaSenhas() {
    const ticket = this.senhasService.chamarProximaSenha();
    if (ticket) {
      this.playCallSound();
      // Aguarda o sinal sonoro terminar antes de falar a senha
      setTimeout(() => {
        this.speakTicket(ticket);
      }, 700);
    } else {
      const toast = await this.toastController.create({
        message: 'Nenhuma senha aguardando na fila!',
        duration: 2000,
        color: 'warning',
        position: 'bottom',
        buttons: [{ text: 'Ok', role: 'cancel' }]
      });
      await toast.present();
    }
  }

  getTicketTypeClass(ticket: string): string {
    if (ticket.includes('-SG')) {
      return 'badge-geral';
    }
    if (ticket.includes('-SP')) {
      return 'badge-prioritario';
    }
    if (ticket.includes('-SE')) {
      return 'badge-exame';
    }
    return '';
  }

  getTicketTypeName(ticket: string): string {
    if (ticket.includes('-SG')) {
      return 'ATENDIMENTO GERAL';
    }
    if (ticket.includes('-SP')) {
      return 'ATENDIMENTO PRIORITÁRIO';
    }
    if (ticket.includes('-SE')) {
      return 'EXAMES / PROCEDIMENTOS';
    }
    return 'SENHA';
  }

  getTicketTypeNameShort(ticket: string): string {
    if (ticket.includes('-SG')) {
      return 'Geral';
    }
    if (ticket.includes('-SP')) {
      return 'Prioritária';
    }
    if (ticket.includes('-SE')) {
      return 'Exame';
    }
    return 'Senha';
  }

  private playCallSound() {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Primeiro tom (Ding)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);

      // Segundo tom (Dong)
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(440.00, ctx.currentTime); // A4
        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.5);
      }, 200);
    } catch (e) {
      console.warn('Web Audio API não suportada ou bloqueada:', e);
    }
  }

  private speakTicket(ticket: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Para qualquer fala em andamento

      const parts = ticket.split('-');
      const code = parts.length > 1 ? parts[1] : ticket;
      
      // Separa letras e números da senha (ex: SG1 -> Geral 1)
      const match = code.match(/^([A-Za-z]+)(\d+)$/);
      let spokenText = 'Senha ';
      
      if (match) {
        const type = match[1];
        const num = match[2];
        if (type === 'SG') {
          spokenText += `Geral, número ${num}`;
        } else if (type === 'SP') {
          spokenText += `Prioritária, número ${num}`;
        } else if (type === 'SE') {
          spokenText += `Exame, número ${num}`;
        } else {
          spokenText += `${type.split('').join(' ')}, número ${num}`;
        }
      } else {
        spokenText += code.split('').join(' ');
      }

      spokenText += '. Por favor, dirija-se ao guichê de atendimento.';

      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.95; // Velocidade levemente reduzida para melhor clareza
      utterance.pitch = 1.0;

      // Procura voz em português
      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find(v => v.lang.startsWith('pt'));
      if (ptVoice) {
        utterance.voice = ptVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  }
}

