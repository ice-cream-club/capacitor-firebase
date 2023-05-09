import { WebPlugin } from '@capacitor/core';
import { EmailAuthProvider, FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, OAuthCredential, OAuthProvider, TwitterAuthProvider, applyActionCode, confirmPasswordReset, connectAuthEmulator, createUserWithEmailAndPassword, deleteUser, getAdditionalUserInfo, getAuth, getRedirectResult, isSignInWithEmailLink, linkWithCredential, linkWithPopup, linkWithRedirect, reload, sendEmailVerification, sendPasswordResetEmail, sendSignInLinkToEmail, signInAnonymously, signInWithCustomToken, signInWithEmailAndPassword, signInWithEmailLink, signInWithPopup, signInWithRedirect, unlink, updateEmail, updatePassword, updateProfile, } from 'firebase/auth';
import { ProviderId } from './definitions';
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
        const userCredential = await createUserWithEmailAndPassword(auth, options.email, options.password);
        return this.createSignInResult(userCredential, null);
    }
    async confirmPasswordReset(options) {
        const auth = getAuth();
        return confirmPasswordReset(auth, options.oobCode, options.newPassword);
    }
    async confirmVerificationCode(_options) {
        throw new Error('Not implemented on web.');
    }
    async deleteUser() {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        return deleteUser(currentUser);
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
    async getRedirectResult() {
        const auth = getAuth();
        const userCredential = await getRedirectResult(auth);
        const authCredential = userCredential
            ? OAuthProvider.credentialFromResult(userCredential)
            : null;
        return this.createSignInResult(userCredential, authCredential);
    }
    async getTenantId() {
        const auth = getAuth();
        return {
            tenantId: auth.tenantId,
        };
    }
    async isSignInWithEmailLink(options) {
        const auth = getAuth();
        return {
            isSignInWithEmailLink: isSignInWithEmailLink(auth, options.emailLink),
        };
    }
    async linkWithApple(options) {
        const provider = new OAuthProvider(ProviderId.APPLE);
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.linkCurrentUserWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = OAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async linkWithEmailAndPassword(options) {
        const authCredential = EmailAuthProvider.credential(options.email, options.password);
        const userCredential = await this.linkCurrentUserWithCredential(authCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async linkWithEmailLink(options) {
        const authCredential = EmailAuthProvider.credentialWithLink(options.email, options.emailLink);
        const userCredential = await this.linkCurrentUserWithCredential(authCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async linkWithFacebook(options) {
        const provider = new FacebookAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.linkCurrentUserWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = FacebookAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async linkWithGameCenter() {
        throw new Error('Not available on web.');
    }
    async linkWithGithub(options) {
        const provider = new GithubAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.linkCurrentUserWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = GithubAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async linkWithGoogle(options) {
        const provider = new GoogleAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.linkCurrentUserWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = GoogleAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async linkWithMicrosoft(options) {
        const provider = new OAuthProvider(ProviderId.MICROSOFT);
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.linkCurrentUserWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = OAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async linkWithPhoneNumber(_options) {
        throw new Error('Not implemented on web.');
    }
    async linkWithPlayGames() {
        throw new Error('Not available on web.');
    }
    async linkWithTwitter(options) {
        const provider = new TwitterAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.linkCurrentUserWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = TwitterAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async linkWithYahoo(options) {
        const provider = new OAuthProvider(ProviderId.YAHOO);
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.linkCurrentUserWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = OAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async reload() {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        return reload(currentUser);
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
    async sendSignInLinkToEmail(options) {
        const auth = getAuth();
        return sendSignInLinkToEmail(auth, options.email, options.actionCodeSettings);
    }
    async setLanguageCode(options) {
        const auth = getAuth();
        auth.languageCode = options.languageCode;
    }
    async signInAnonymously() {
        const auth = getAuth();
        const userCredential = await signInAnonymously(auth);
        return this.createSignInResult(userCredential, null);
    }
    async setTenantId(options) {
        const auth = getAuth();
        auth.tenantId = options.tenantId;
    }
    async signInWithApple(options) {
        const provider = new OAuthProvider(ProviderId.APPLE);
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.signInWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = OAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async signInWithCustomToken(options) {
        const auth = getAuth();
        const userCredential = await signInWithCustomToken(auth, options.token);
        return this.createSignInResult(userCredential, null);
    }
    async signInWithEmailAndPassword(options) {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, options.email, options.password);
        return this.createSignInResult(userCredential, null);
    }
    async signInWithEmailLink(options) {
        const auth = getAuth();
        const userCredential = await signInWithEmailLink(auth, options.email, options.emailLink);
        return this.createSignInResult(userCredential, null);
    }
    async signInWithFacebook(options) {
        const provider = new FacebookAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.signInWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = FacebookAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async signInWithGithub(options) {
        const provider = new GithubAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.signInWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = GithubAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async signInWithGoogle(options) {
        const provider = new GoogleAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.signInWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = GoogleAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async signInWithMicrosoft(options) {
        const provider = new OAuthProvider(ProviderId.MICROSOFT);
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.signInWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = OAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async signInWithPhoneNumber(_options) {
        throw new Error('Not implemented on web.');
    }
    async signInWithPlayGames() {
        throw new Error('Not available on web.');
    }
    async signInWithGameCenter() {
        throw new Error('Not available on web.');
    }
    async signInWithTwitter(options) {
        const provider = new TwitterAuthProvider();
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.signInWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = TwitterAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async signInWithYahoo(options) {
        const provider = new OAuthProvider(ProviderId.YAHOO);
        this.applySignInOptions(options || {}, provider);
        const userCredential = await this.signInWithPopupOrRedirect(provider, options === null || options === void 0 ? void 0 : options.mode);
        const authCredential = OAuthProvider.credentialFromResult(userCredential);
        return this.createSignInResult(userCredential, authCredential);
    }
    async signOut() {
        const auth = getAuth();
        await auth.signOut();
    }
    async unlink(options) {
        const auth = getAuth();
        if (!auth.currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        const user = await unlink(auth.currentUser, options.providerId);
        const userResult = this.createUserResult(user);
        const result = {
            user: userResult,
        };
        return result;
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
    async updateProfile(options) {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (!currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        return updateProfile(currentUser, options);
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
        if (options.customParameters) {
            const customParameters = {};
            options.customParameters.map(parameter => {
                customParameters[parameter.key] = parameter.value;
            });
            provider.setCustomParameters(customParameters);
        }
        if (options.scopes) {
            for (const scope of options.scopes) {
                provider.addScope(scope);
            }
        }
    }
    signInWithPopupOrRedirect(provider, mode) {
        const auth = getAuth();
        if (mode === 'redirect') {
            return signInWithRedirect(auth, provider);
        }
        else {
            return signInWithPopup(auth, provider);
        }
    }
    linkCurrentUserWithPopupOrRedirect(provider, mode) {
        const auth = getAuth();
        if (!auth.currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        if (mode === 'redirect') {
            return linkWithRedirect(auth.currentUser, provider);
        }
        else {
            return linkWithPopup(auth.currentUser, provider);
        }
    }
    linkCurrentUserWithCredential(credential) {
        const auth = getAuth();
        if (!auth.currentUser) {
            throw new Error(FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN);
        }
        return linkWithCredential(auth.currentUser, credential);
    }
    createSignInResult(userCredential, authCredential) {
        const userResult = this.createUserResult((userCredential === null || userCredential === void 0 ? void 0 : userCredential.user) || null);
        const credentialResult = this.createCredentialResult(authCredential);
        const additionalUserInfoResult = this.createAdditionalUserInfoResult(userCredential);
        const result = {
            user: userResult,
            credential: credentialResult,
            additionalUserInfo: additionalUserInfoResult,
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
    createAdditionalUserInfoResult(credential) {
        if (!credential) {
            return null;
        }
        const additionalUserInfo = getAdditionalUserInfo(credential);
        if (!additionalUserInfo) {
            return null;
        }
        const { isNewUser, profile, providerId, username } = additionalUserInfo;
        const result = {
            isNewUser,
        };
        if (providerId !== null) {
            result.providerId = providerId;
        }
        if (profile !== null) {
            result.profile = profile;
        }
        if (username !== null && username !== undefined) {
            result.username = username;
        }
        return result;
    }
}
FirebaseAuthenticationWeb.ERROR_NO_USER_SIGNED_IN = 'No user is signed in.';
//# sourceMappingURL=web.js.map