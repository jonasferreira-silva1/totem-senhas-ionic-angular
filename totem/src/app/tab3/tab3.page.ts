import { Component } from '@angular/core';
import { SenhasService } from '../services/senhas.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    public senhasService: SenhasService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async resetarFila() {
    const alert = await this.alertController.create({
      header: 'Confirmar Reinício',
      message: 'Deseja realmente zerar todas as senhas, contadores e histórico? Esta ação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Zerar Tudo',
          role: 'destructive',
          handler: async () => {
            this.senhasService.limparDados();
            const toast = await this.toastController.create({
              message: 'Sistema reiniciado com sucesso!',
              duration: 2000,
              color: 'success',
              position: 'bottom'
            });
            await toast.present();
          }
        }
      ]
    });

    await alert.present();
  }

  getGeralPercent(): number {
    return this.senhasService.senhasTotal > 0 
      ? (this.senhasService.senhasGeral / this.senhasService.senhasTotal) 
      : 0;
  }

  getPrioritarioPercent(): number {
    return this.senhasService.senhasTotal > 0 
      ? (this.senhasService.senhasPrior / this.senhasService.senhasTotal) 
      : 0;
  }

  getExamePercent(): number {
    return this.senhasService.senhasTotal > 0 
      ? (this.senhasService.senhasExame / this.senhasService.senhasTotal) 
      : 0;
  }
}
