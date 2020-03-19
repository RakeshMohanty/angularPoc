import { Injectable } from '@angular/core';

@Injectable()
export class FnUtilsService {

    isAndroid(): boolean {
        return /android/i.test(navigator.userAgent);
    }

    isFirefox(): boolean {
        return /firefox/i.test(navigator.userAgent);
    }

    isMac(): boolean {
        return navigator.userAgent.indexOf('Mac') > -1;
    }

    isAndroidMobile(): boolean {
        return /android/i.test(navigator.userAgent) && navigator.userAgent.indexOf('Mobile') > -1;
    }
}
