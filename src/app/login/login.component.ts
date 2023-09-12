import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { timer } from "rxjs";
import { GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit, AfterViewInit {
    name: any = "";
    constructor(
        private router: Router,
        private socialAuthService: SocialAuthService
    ) {}

    ngAfterViewInit(): void {
        (window as any).fbAsyncInit = function () {
            FB.init({
                appId: "6709701495742434",
                cookie: true,
                xfbml: true,
                version: "v3.1"
            });
            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            let js: HTMLElement | any;
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    }

    ngOnInit(): void {
      console.log("first")
        if (history.state && history.state.noActiveSession) {
            timer(0).subscribe(() => {
                history.pushState({ noActiveSession: false }, "");
            });
        }
    }

    loginWithFacebook(): void {
        console.log("submit login to facebook");
        FB.login((response: any) => {
            if (response) {
                console.log("submitLogin", response.authResponse);
                FB.api("/me", (res: SocialUser) => {
                    if (res?.name) {
                        console.log("social user", res);
                        this.name = res?.name;
                        console.log("name", this.name);
                        localStorage.setItem(
                          "userDetails", this.name
                          );
                        this.router.navigateByUrl("/dashboard");
                        } else {
                          console.log("Something went wrong.");
                        }
                      });
                    } else {
                      console.log("User login failed");
                    }
                  });
    }
    loginWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }
}
