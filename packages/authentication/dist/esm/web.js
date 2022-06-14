import { WebPlugin } from '@capacitor/core';
import { applyActionCode, confirmPasswordReset, connectAuthEmulator, createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, OAuthCredential, OAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithCustomToken, signInWithEmailAndPassword, signInWithPopup, updateEmail, updatePassword, } from 'firebase/auth';
export class FirebaseAuthenticationWeb extends WebPlugin {
    constructor() {
        super();
        const auth = getAuth();
        auth.onAuthStateChanged(user => this.handleAuthStateChange(user));
    }
    async applyActionCode(options) {
        const auth = getAuth();
        return applyActionCode(auth, options.oobCode);
    }
    async createUserWithEmailAndPassword(options) {
        const auth = getAuth();
        const credential = await createUserWithEmailAndPassword(auth, options.email, options.password);
        return this.createSignInResultFromUserCredential(credential);
    }
    async confirmPasswordReset(options) {
        const auth = getAuth();
        return confirmPasswordReset(auth, options.oobCode, options.newPassword);
    }
    async getCurrentUser() {
        const auth = getAuth();
        const userResult = this.createUserResult(auth.currentUser);
        const result = {
            user: userResult,
        };
        return result;
    }
    async getIdToken(options) {
        const auth = getAuth();
        if (!auth.currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        const idToken = await auth.currentUser.getIdToken(options === null || options === void 0 ? void 0 : options.forceRefresh);
        const result = {
            token: idToken || '',
        };
        return result;
    }
    async sendEmailVerification() {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        return sendEmailVerification(currentUser);
    }
    async sendPasswordResetEmail(options) {
        const auth = getAuth();
        return sendPasswordResetEmail(auth, options.email);
    }
    async setLanguageCode(options) {
        const auth = getAuth();
        auth.languageCode = options.languageCode;
    }
    async signInWithApple(options) {
        const provider = new OAuthProvider('apple.com');
        this.applySignInOptions(options || {}, provider);
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResultFromAuthCredential(result.user, credential);
    }
    async signInWithCustomToken(options) {
        const auth = getAuth();
        const result = await signInWithCustomToken(auth, options.token);
        return this.createSignInResultFromAuthCredential(result.user, null);
    }
    async signInWithEmailAndPassword(options) {
        const auth = getAuth();
        const credential = await signInWithEmailAndPassword(auth, options.email, options.password);
        return this.createSignInResultFromUserCredential(credential);
    }
    async signInWithFacebook(options) {
        const provider = new FacebookAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        return this.createSignInResultFromAuthCredential(result.user, credential);
    }
    async signInWithGithub(options) {
        const provider = new OAuthProvider('github.com');
        this.applySignInOptions(options || {}, provider);
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResultFromAuthCredential(result.user, credential);
    }
    async signInWithGoogle(options) {
        const provider = new GoogleAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        return this.createSignInResultFromAuthCredential(result.user, credential);
    }
    async signInWithMicrosoft(options) {
        const provider = new OAuthProvider('microsoft.com');
        this.applySignInOptions(options || {}, provider);
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResultFromAuthCredential(result.user, credential);
    }
    async signInWithPhoneNumber(_options) {
        throw new Error('Not implemented on web.');
    }
    async signInWithPlayGames() {
        throw new Error('Not available on web.');
    }
    async signInWithTwitter(options) {
        const provider = new OAuthProvider('twitter.com');
        this.applySignInOptions(options || {}, provider);
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResultFromAuthCredential(result.user, credential);
    }
    async signInWithYahoo(options) {
        const provider = new OAuthProvider('yahoo.com');
        this.applySignInOptions(options || {}, provider);
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResultFromAuthCredential(result.user, credential);
    }
    async signOut() {
        const auth = getAuth();
        await auth.signOut();
    }
    async updateEmail(options) {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        return updateEmail(currentUser, options.newEmail);
    }
    async updatePassword(options) {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        return updatePassword(currentUser, options.newPassword);
    }
    async useAppLanguage() {
        const auth = getAuth();
        auth.useDeviceLanguage();
    }
    async useEmulator(options) {
        const auth = getAuth();
        const port = options.port || 9099;
        connectAuthEmulator(auth, `${options.host}:${port}`);
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
        if (credential instanceof OAuthCredential) {
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
//# sourceMappingURL=web.js.map