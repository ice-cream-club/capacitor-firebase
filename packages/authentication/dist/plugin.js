var capacitorFirebaseAuthentication = (function (exports, core, auth) {
    'use strict';

    const FirebaseAuthentication = core.registerPlugin('FirebaseAuthentication', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.FirebaseAuthenticationWeb()),
    });

    class FirebaseAuthenticationWeb extends core.WebPlugin {
        constructor() {
            super();
            const auth$1 = auth.getAuth();
            auth$1.onAuthStateChanged(user => this.handleAuthStateChange(user));
        }
        async applyActionCode(options) {
            const auth$1 = auth.getAuth();
            return auth.applyActionCode(auth$1, options.oobCode);
        }
        async createUserWithEmailAndPassword(options) {
            const auth$1 = auth.getAuth();
            const credential = await auth.createUserWithEmailAndPassword(auth$1, options.email, options.password);
            return this.createSignInResultFromUserCredential(credential);
        }
        async confirmPasswordReset(options) {
            const auth$1 = auth.getAuth();
            return auth.confirmPasswordReset(auth$1, options.oobCode, options.newPassword);
        }
        async getCurrentUser() {
            const auth$1 = auth.getAuth();
            const userResult = this.createUserResult(auth$1.currentUser);
            const result = {
                user: userResult,
            };
            return result;
        }
        async getIdToken(options) {
            const auth$1 = auth.getAuth();
            if (!auth$1.currentUser) {
                throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
            }
            const idToken = await auth$1.currentUser.getIdToken(options === null || options === void 0 ? void 0 : options.forceRefresh);
            const result = {
                token: idToken || '',
            };
            return result;
        }
        async sendEmailVerification() {
            const auth$1 = auth.getAuth();
            const currentUser = auth$1.currentUser;
            if (!currentUser) {
                throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
            }
            return auth.sendEmailVerification(currentUser);
        }
        async sendPasswordResetEmail(options) {
            const auth$1 = auth.getAuth();
            return auth.sendPasswordResetEmail(auth$1, options.email);
        }
        async setLanguageCode(options) {
            const auth$1 = auth.getAuth();
            auth$1.languageCode = options.languageCode;
        }
        async signInWithApple(options) {
            const provider = new auth.OAuthProvider('apple.com');
            this.applySignInOptions(options || {}, provider);
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResultFromAuthCredential(result.user, credential);
        }
        async signInWithCustomToken(options) {
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithCustomToken(auth$1, options.token);
            return this.createSignInResultFromAuthCredential(result.user, null);
        }
        async signInWithEmailAndPassword(options) {
            const auth$1 = auth.getAuth();
            const credential = await auth.signInWithEmailAndPassword(auth$1, options.email, options.password);
            return this.createSignInResultFromUserCredential(credential);
        }
        async signInWithFacebook(options) {
            const provider = new auth.FacebookAuthProvider();
            this.applySignInOptions(options || {}, provider);
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.FacebookAuthProvider.credentialFromResult(result);
            return this.createSignInResultFromAuthCredential(result.user, credential);
        }
        async signInWithGithub(options) {
            const provider = new auth.OAuthProvider('github.com');
            this.applySignInOptions(options || {}, provider);
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResultFromAuthCredential(result.user, credential);
        }
        async signInWithGoogle(options) {
            const provider = new auth.GoogleAuthProvider();
            this.applySignInOptions(options || {}, provider);
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.GoogleAuthProvider.credentialFromResult(result);
            return this.createSignInResultFromAuthCredential(result.user, credential);
        }
        async signInWithMicrosoft(options) {
            const provider = new auth.OAuthProvider('microsoft.com');
            this.applySignInOptions(options || {}, provider);
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResultFromAuthCredential(result.user, credential);
        }
        async signInWithPhoneNumber(_options) {
            throw new Error('Not implemented on web.');
        }
        async signInWithPlayGames() {
            throw new Error('Not available on web.');
        }
        async signInWithTwitter(options) {
            const provider = new auth.OAuthProvider('twitter.com');
            this.applySignInOptions(options || {}, provider);
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResultFromAuthCredential(result.user, credential);
        }
        async signInWithYahoo(options) {
            const provider = new auth.OAuthProvider('yahoo.com');
            this.applySignInOptions(options || {}, provider);
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResultFromAuthCredential(result.user, credential);
        }
        async signOut() {
            const auth$1 = auth.getAuth();
            await auth$1.signOut();
        }
        async updateEmail(options) {
            const auth$1 = auth.getAuth();
            const currentUser = auth$1.currentUser;
            if (!currentUser) {
                throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
            }
            return auth.updateEmail(currentUser, options.newEmail);
        }
        async updatePassword(options) {
            const auth$1 = auth.getAuth();
            const currentUser = auth$1.currentUser;
            if (!currentUser) {
                throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
            }
            return auth.updatePassword(currentUser, options.newPassword);
        }
        async useAppLanguage() {
            const auth$1 = auth.getAuth();
            auth$1.useDeviceLanguage();
        }
        async useEmulator(options) {
            const auth$1 = auth.getAuth();
            const port = options.port || 9099;
            auth.connectAuthEmulator(auth$1, `${options.host}:${port}`);
        }
        handleAuthStateChange(user) {
            const userResult = this.createUserResult(user);
            const change = {
                user: userResult,
            };
            this.notifyListeners('authStateChange', change);
        }
        applySignInOptions(options, provider) {
            if (options === null || options === void 0 ? void 0 : options.scopes) {
                for (const scope of options.scopes) {
                    provider.addScope(scope);
                }
            }
        }
        createSignInResultFromAuthCredential(user, credential) {
            const userResult = this.createUserResult(user);
            const credentialResult = this.createCredentialResult(credential);
            const result = {
                user: userResult,
                credential: credentialResult,
            };
            return result;
        }
        createSignInResultFromUserCredential(credential) {
            const userResult = this.createUserResult(credential.user);
            const result = {
                user: userResult,
                credential: null,
            };
            return result;
        }
        createCredentialResult(credential) {
            if (!credential) {
                return null;
            }
            const result = {
                providerId: credential.providerId,
            };
            if (credential instanceof auth.OAuthCredential) {
                result.accessToken = credential.accessToken;
                result.idToken = credential.idToken;
                result.secret = credential.secret;
            }
            return result;
        }
        createUserResult(user) {
            if (!user) {
                return null;
            }
            const result = {
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                phoneNumber: user.phoneNumber,
                photoUrl: user.photoURL,
                providerId: user.providerId,
                tenantId: user.tenantId,
                uid: user.uid,
            };
            return result;
        }
    }
    FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN = 'No user is signed in.';

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        FirebaseAuthenticationWeb: FirebaseAuthenticationWeb
    });

    exports.FirebaseAuthentication = FirebaseAuthentication;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, capacitorExports, firebaseAuthExports));
//# sourceMappingURL=plugin.js.map
