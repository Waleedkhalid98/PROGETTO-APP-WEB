import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Employee } from "src/app/models/employee";
import { User } from "src/app/models/user";
import { UserService } from "src/app/service/user.service";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  /**
   * Il metodo canActivate ritorna true solo quando il percorso può essere navigato.
   * In caso di false (l'utente non è autenticato), la navigazione può essere reindirizzata alla home.
   * @returns 
   */
 
canActivate(): boolean {
    if (!this.authService.isAuthenticated() || this.userService.getUser() == null) {
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}