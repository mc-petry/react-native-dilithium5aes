package com.dilithium5aes;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.JavaScriptContextHolder;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = Dilithium5aesModule.NAME)
public class Dilithium5aesModule extends ReactContextBaseJavaModule {
  public static final String NAME = "Dilithium5aes";

  public Dilithium5aesModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("react-native-dilithium5aes");
  }

  private static native void nativeInstall(long jsiPtr);

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean install() {
    try {
      Log.i(NAME, "Installing Dilithium JSI Bindings");
      JavaScriptContextHolder jsContext = getReactApplicationContext().getJavaScriptContextHolder();
      nativeInstall(jsContext.get());
      Log.i(NAME, "Successfully installed Dilithium JSI Bindings!");
      return true;
    }
    catch (Exception exception) {
      Log.e(NAME, "Failed to install Dilithium JSI Bindings!", exception);
      return false;
    }
  }
}
