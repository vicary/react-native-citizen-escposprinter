package com.citizenescposprinter

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.Promise

import android.hardware.usb.UsbDevice

abstract class CitizenEscposprinterSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  // TODO: Find a way to address UsbDevices from JavaScript
  // abstract fun connect(connectType: Int, device: UsbDevice)
  abstract fun connect(
    connectType: Int,
    address: String,
    port: Int,
    promise: Promise
  )
  abstract fun disconnect(promise: Promise)
  abstract fun setEncoding(encoding: String, promise: Promise)
  abstract fun printerCheck(promise: Promise)
  abstract fun status(type: Int, promise: Promise)
  abstract fun printText(
    data: String,
    alignment: Int,
    attribute: Int,
    textSize: Int,
    promise: Promise
  )
  abstract fun printPaddingText(
    data: String,
    attribute: Int,
    textSize: Int,
    length: Int,
    side: Int,
    promise: Promise
  )
  abstract fun searchESCPOSPrinter(ifType: Int, timeout: Int, promise: Promise)
}
