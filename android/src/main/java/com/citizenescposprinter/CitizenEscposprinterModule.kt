package com.citizenescposprinter

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class CitizenEscposprinterModule internal constructor(context: ReactApplicationContext) :
  CitizenEscposprinterSpec(context) {

  override fun getName(): String {
    return NAME
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  override fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  companion object {
    const val NAME = "CitizenEscposprinter"
  }
}
