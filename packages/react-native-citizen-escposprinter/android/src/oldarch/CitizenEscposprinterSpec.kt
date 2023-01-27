package com.citizenescposprinter

import com.citizen.sdk.ESCPOSConst
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class CitizenEscposprinterSpec internal constructor(context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

  // import android.hardware.usb.UsbDevice
  // abstract fun connect(connectType: Int, device: UsbDevice)
  abstract fun connect(
      type: Double,
      address: String,
      port: Double,
      timeout: Double,
      promise: Promise
  )
  abstract fun disconnect(promise: Promise)
  abstract fun setEncoding(encoding: String, promise: Promise)
  abstract fun printerCheck(promise: Promise)
  abstract fun status(type: Double, promise: Promise)
  abstract fun printText(
      data: String,
      alignment: Double,
      attribute: Double,
      textSize: Double,
      promise: Promise
  )
  abstract fun printPaddingText(
      data: String,
      attribute: Double,
      textSize: Double,
      length: Double,
      side: Double,
      promise: Promise
  )
  abstract fun printTextLocalFont(
      data: String,
      alignment: Double,
      fontType: String,
      point: Double,
      style: Double,
      hRatio: Double,
      vRatio: Double,
      promise: Promise
  )
  abstract fun printBitmap(
      data: String,
      width: Double = ESCPOSConst.CMP_BM_ASIS.toDouble(),
      alignment: Double = ESCPOSConst.CMP_ALIGNMENT_CENTER.toDouble(),
      mode: Double = 0.0,
      promise: Promise
  )
  abstract fun printBarCode(
      data: String,
      symbology: Double,
      height: Double,
      width: Double,
      alignment: Double,
      textPosition: Double,
      promise: Promise
  )
  abstract fun printPDF417(
      data: String,
      digits: Double,
      steps: Double,
      moduleWidth: Double,
      stepHeight: Double,
      ECLevel: Double,
      alignment: Double,
      promise: Promise
  )
  abstract fun printQRCode(
      data: String,
      moduleSize: Double,
      ECLevel: Double,
      alignment: Double,
      promise: Promise
  )
  abstract fun printGS1DataBarStacked(
      data: String,
      symbology: Double,
      moduleSize: Double,
      maxSize: Double,
      alignment: Double,
      promise: Promise
  )
  abstract fun cutPaper(type: Double, promise: Promise)
  abstract fun unitFeed(ufCount: Double, promise: Promise)
  abstract fun markFeed(type: Double, promise: Promise)
  abstract fun openDrawer(drawer: Double, pulseLen: Double, promise: Promise)
  abstract fun transactionPrint(control: Double, promise: Promise)
  abstract fun rotatePrint(rotation: Double, promise: Promise)
  abstract fun pageModePrint(control: Double, promise: Promise)
  abstract fun clearPrintArea(promise: Promise)
  abstract fun clearOutput(promise: Promise)
  abstract fun printData(data: String, promise: Promise)
  abstract fun printNormal(data: String, promise: Promise)
  abstract fun watermarkPrint(
    start: Double,
    nvImageNumber: Double,
    pass: Double,
    feed: Double,
    repeat: Double,
    promise: Promise
  )
  abstract fun printNVBitmap(nvImageNumber: Double, promise: Promise)
  abstract fun searchCitizenPrinter(connectType: Double, timeout: Double, promise: Promise)
  abstract fun searchESCPOSPrinter(connectType: Double, timeout: Double, promise: Promise)
  abstract fun printerCheckEx(
      connectType: Double,
      address: String,
      port: Double?,
      timeout: Double?,
      promise: Promise
  )
  abstract fun openDrawerEx(
      drawer: Double,
      pulseLen: Double,
      connectType: Double,
      address: String,
      port: Double?,
      timeout: Double?,
      promise: Promise
  )
  abstract fun setPrintCompletedTimeout(timeout: Double, promise: Promise)
  abstract fun setLog(mode: Double, path: String, maxSize: Double, promise: Promise)
  abstract fun getVersionCode(promise: Promise)
  abstract fun getVersionName(promise: Promise)
}
