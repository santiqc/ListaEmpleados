import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @ViewChild('alertModal', { static: true }) modalRef!: ElementRef;
  @Input() public closeResult = '';
  @Input() public modalMessage = '';
  @Input() public modalTittle = '';
  @Input() public parameter: any = '';
  @Output() close = new EventEmitter<boolean>();
  @Output() accept = new EventEmitter<any>();

  constructor(private modalService: NgbModal) {
    this.closeResult = '';
    this.modalMessage = '';
    this.modalTittle = '';
  }

  ngOnInit(): void {}

  public async launchModal(body: string, tittle: string, _closeFunction?: any) {
    this.modalMessage = body;
    this.modalTittle = tittle;
    const ModalResult = await this.modalService
      .open(this.modalRef, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
        keyboard: false,
      })
      .result.then(
        (result) => {
          return result;
        },
        (reason: string) => {
          return reason;
        }
      );
    return ModalResult;
  }

  public closeModal() {
    this.close.emit(true);
  }

  public acceptModal(data: any) {
    if (data) {
      this.accept.emit(data);
    }
  }
}
