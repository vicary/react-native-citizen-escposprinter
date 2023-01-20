package com.citizenescposprinter

import com.citizen.sdk.ESCPOSConst
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class CitizenEscposprinterSpec internal constructor(context: ReactApplicationContext) :
    ReactContextBaseJavaModule(context) {

  // TODO: Find a way to address UsbDevices from JavaScript
  // import android.hardware.usb.UsbDevice
  // abstract fun connect(connectType: Int, device: UsbDevice)
  abstract fun connect(
      connectType: Int,
      address: String,
      port: Int = -1,
      timeout: Int = -1,
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
  abstract fun printTextLocalFont(
      data: String,
      alignment: Int,
      fontType: String,
      point: Int,
      style: Int,
      hRatio: Int,
      vRatio: Int,
      promise: Promise
  )
  abstract fun printBitmap(
      data: String,
      width: Int = ESCPOSConst.CMP_BM_ASIS,
      alignment: Int = ESCPOSConst.CMP_ALIGNMENT_CENTER,
      mode: Int = 0,
      promise: Promise
  )
  abstract fun printBarCode(
      data: String,
      symbology: Int,
      height: Int,
      width: Int,
      alignment: Int,
      textPosition: Int,
      promise: Promise
  )
  abstract fun printPDF417(
      data: String,
      digits: Int,
      steps: Int,
      moduleWidth: Int,
      stepHeight: Int,
      ECLevel: Int,
      alignment: Int,
      promise: Promise
  )
  abstract fun printQRCode(
      data: String,
      moduleSize: Int,
      ECLevel: Int,
      alignment: Int,
      promise: Promise
  )
  abstract fun printGS1DataBarStacked(
      data: String,
      symbology: Int,
      moduleSize: Int,
      maxSize: Int,
      alignment: Int,
      promise: Promise
  )
  abstract fun cutPaper(type: Int, promise: Promise)
  abstract fun unitFeed(ufCount: Int, promise: Promise)
  abstract fun markFeed(type: Int, promise: Promise)
  abstract fun openDrawer(drawer: Int, pulseLen: Int, promise: Promise)
  abstract fun transactionPrint(control: Int, promise: Promise)
  abstract fun rotatePrint(rotation: Int, promise: Promise)
  abstract fun pageModePrint(control: Int, promise: Promise)
  abstract fun clearPrintArea(promise: Promise)
  abstract fun clearOutput(promise: Promise)
  abstract fun printData(data: String, promise: Promise)
  abstract fun printNormal(data: String, promise: Promise)
  abstract fun printNVBitmap(nvImageNumber: Int, promise: Promise)
  abstract fun searchCitizenPrinter(connectType: Int, timeout: Int, promise: Promise)
  abstract fun searchESCPOSPrinter(connectType: Int, timeout: Int, promise: Promise)
  abstract fun printerCheckEx(
      connectType: Int,
      address: String,
      port: Int?,
      timeout: Int?,
      promise: Promise
  )
  abstract fun openDrawerEx(
      drawer: Int,
      pulseLen: Int,
      connectType: Int,
      address: String,
      port: Int?,
      timeout: Int?,
      promise: Promise
  )
  abstract fun setPrintCompletedTimeout(timeout: Int, promise: Promise)
  abstract fun setLog(mode: Int, path: String, maxSize: Int, promise: Promise)
  abstract fun getVersionCode(promise: Promise)
  abstract fun getVersionName(promise: Promise)
}
