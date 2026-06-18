import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {
  public inputNovaSenha: string = '';
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public senhasArray: string[] = [];
  public senhasChamadas: string[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private getFormattedDatePrefix(): string {
    const now = new Date();
    const yy = now.getFullYear().toString().substring(2, 4);
    const mm = (now.getMonth() + 1).toString().padStart(2, '0');
    const dd = now.getDate().toString().padStart(2, '0');
    return `${yy}${mm}${dd}-`;
  }

  novaSenha(tipoSenha: string = '') {
    const prefix = this.getFormattedDatePrefix();
    let sequencia = 0;

    if (tipoSenha === 'SG') {
      this.senhasGeral++;
      sequencia = this.senhasGeral;
    } else if (tipoSenha === 'SP') {
      this.senhasPrior++;
      sequencia = this.senhasPrior;
    } else if (tipoSenha === 'SE') {
      this.senhasExame++;
      sequencia = this.senhasExame;
    } else {
      return;
    }

    this.senhasTotal++;
    this.inputNovaSenha = `${prefix}${tipoSenha}${sequencia}`;
    this.senhasArray.push(this.inputNovaSenha);
    this.saveToLocalStorage();
  }

  chamarProximaSenha(): string | null {
    if (this.senhasArray.length === 0) {
      return null;
    }
    const proxima = this.senhasArray.shift(); // FIFO: remove o primeiro elemento
    if (proxima) {
      this.senhasChamadas.unshift(proxima); // Adiciona no início da lista de chamadas para mostrar a mais recente primeiro
      this.saveToLocalStorage();
      return proxima;
    }
    return null;
  }

  limparDados() {
    this.inputNovaSenha = '';
    this.senhasGeral = 0;
    this.senhasPrior = 0;
    this.senhasExame = 0;
    this.senhasTotal = 0;
    this.senhasArray = [];
    this.senhasChamadas = [];
    localStorage.removeItem('totem_senhas_state');
  }

  private saveToLocalStorage() {
    const state = {
      inputNovaSenha: this.inputNovaSenha,
      senhasGeral: this.senhasGeral,
      senhasPrior: this.senhasPrior,
      senhasExame: this.senhasExame,
      senhasTotal: this.senhasTotal,
      senhasArray: this.senhasArray,
      senhasChamadas: this.senhasChamadas
    };
    localStorage.setItem('totem_senhas_state', JSON.stringify(state));
  }

  private loadFromLocalStorage() {
    const saved = localStorage.getItem('totem_senhas_state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        this.inputNovaSenha = state.inputNovaSenha || '';
        this.senhasGeral = state.senhasGeral || 0;
        this.senhasPrior = state.senhasPrior || 0;
        this.senhasExame = state.senhasExame || 0;
        this.senhasTotal = state.senhasTotal || 0;
        this.senhasArray = state.senhasArray || [];
        this.senhasChamadas = state.senhasChamadas || [];
      } catch (e) {
        console.error('Erro ao carregar dados do localStorage', e);
      }
    }
  }
}
