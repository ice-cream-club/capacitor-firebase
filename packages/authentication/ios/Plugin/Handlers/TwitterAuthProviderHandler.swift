import Foundation
import Capacitor
import FirebaseCore
import FirebaseAuth

class TwitterAuthProviderHandler: NSObject {
    var pluginImplementation: FirebaseAuthentication
    var provider: OAuthProvider?

    init(_ pluginImplementation: FirebaseAuthentication) {
        self.pluginImplementation = pluginImplementation
    }

    func signIn(call: CAPPluginCall) {
        self.provider = OAuthProvider(providerID: "twitter.com")
        self.applySignInOptions(call: call, provider: provider!)
        DispatchQueue.main.async {
            self.startSignInFlow()
        }
    }

    private func applySignInOptions(call: CAPPluginCall, provider: OAuthProvider) {
        let customParameters = call.getArray("customParameters", JSObject.self) ?? []
        for (_, customParameter) in customParameters.enumerated() {
            guard let key = customParameter["key"] as? String else {
                continue
            }
            guard let value = customParameter["value"] as? String else {
                continue
            }
            if provider.customParameters == nil {
                provider.customParameters = [:]
            }
            provider.customParameters?[key] = value
        }

        let scopes = call.getArray("scopes", String.self) ?? []
        provider.scopes = scopes
    }

    private func startSignInFlow() {
        self.provider?.getCredentialWith(nil) { credential, error in
            if let error = error {
                self.pluginImplementation.handleFailedSignIn(message: nil, error: error)
                return
            }
            if let credential = credential {

                Auth.auth().signIn(with: credential) { (authResult, error) in
                    if let error = error {
                        self.pluginImplementation.handleFailedSignIn(message: nil, error: error)
                        return
                    }

                    self.pluginImplementation.handleSuccessfulSignIn(credential: (authResult?.credential)!, user: Auth.auth().currentUser, idToken: nil, nonce: nil, accessToken: nil)
                }

            }
        }
    }
}
