import { Component } from '@angular/core';
import { AuthService, UserType } from 'app/modules/auth/services/auth.service';
import { Observable } from 'rxjs';
import { Account } from '../../types/account.type';
import { AccountService } from '../../services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-signature',
  templateUrl: './email-signature.component.html',
  styleUrls: ['./email-signature.component.scss']
})
export class EmailSignatureComponent {
  public isCollapsedEmailSignature = false;
  user$: Observable<UserType>;
  employeeField$: Observable<Account>;


  constructor(
    private _authService: AuthService,
    private _accountService: AccountService,
    ) {}

  ngOnInit(): void {
    this.user$ = this._authService.currentUserSubject.asObservable();
    this.employeeField$ = this._accountService.employeeField$;
  }

  removePrefix(value: string): string {
    return value.replace(/^\[\w+-\d+\]\s*/, '');
  }
  
  copyTable(elId: string) {
    const urlField = document.getElementById(elId);

    if (urlField) {
      const range = document.createRange();
      range.selectNode(urlField);
      const selection = window.getSelection();
      
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
        Swal.fire({
          toast: true,
          icon: 'success',
          iconColor: 'white',
          text: 'Email signature copied to clipboard',
          customClass: {
            popup: 'colored-toast'
          },
          position: 'bottom-right',
          showConfirmButton: false,
          background: 'success',
          timer: 10000,
          timerProgressBar: true,
          showCloseButton: true,
          didOpen: (toast: any) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
      } else {
        console.log('Window selection is null.');
      }
    } else {
      console.log(`Element with id '${elId}' not found.`);
    }
  }
}
