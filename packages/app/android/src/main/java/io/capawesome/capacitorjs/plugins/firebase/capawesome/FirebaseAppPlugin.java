package io.capawesome.capacitorjs.plugins.firebase.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Logger;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@CapacitorPlugin(name = "FirebaseApp")
public class FirebaseAppPlugin extends Plugin {

    public static final String TAG = "FirebaseApp";
    private FirebaseApp firebaseAppInstance;

    public void load() {
        firebaseAppInstance = FirebaseApp.getInstance();
    }

    @PluginMethod
    public void getName(PluginCall call) {
        try {
            JSObject ret = new JSObject();
            ret.put("name", firebaseAppInstance.getName());
            call.resolve(ret);
        } catch (Exception exception) {
            Logger.error(TAG, exception.getMessage(), exception);
            call.reject(exception.getMessage());
        }
    }

    @PluginMethod
    public void getOptions(PluginCall call) {
        try {
            FirebaseOptions options = firebaseAppInstance.getOptions();
            JSObject ret = new JSObject();
            ret.put("apiKey", options.getApiKey());
            ret.put("applicationId", options.getApplicationId());
            ret.put("databaseUrl", options.getDatabaseUrl());
            ret.put("gcmSenderId", options.getGcmSenderId());
            ret.put("projectId", options.getProjectId());
            ret.put("storageBucket", options.getStorageBucket());
            call.resolve(ret);
        } catch (Exception exception) {
            Logger.error(TAG, exception.getMessage(), exception);
            call.reject(exception.getMessage());
        }
    }
}
