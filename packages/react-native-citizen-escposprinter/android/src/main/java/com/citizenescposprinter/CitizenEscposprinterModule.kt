package com.citizenescposprinter

import android.graphics.Typeface
import android.hardware.usb.UsbDevice
import android.util.Base64
import androidx.lifecycle.ViewTreeLifecycleOwner
import androidx.lifecycle.lifecycleScope
import com.citizen.sdk.CitizenPrinterInfo
import com.citizen.sdk.ESCPOSConst
import com.citizen.sdk.ESCPOSPrinter
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import kotlin.comparisons.compareBy
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import java.util.concurrent.atomic.AtomicInteger
import java.util.concurrent.ConcurrentHashMap

class CitizenEscposprinterModule internal constructor(val context: ReactApplicationContext) :
  CitizenEscposprinterSpec(context) {

  private val errorCode = "ESCPOSPrinter"
  private val printersId = AtomicInteger(0)
  private val printers = ConcurrentHashMap<Int, ESCPOSPrinter>()

  companion object {
    const val NAME = "CitizenEscposprinter"
  }

  override fun getName(): String = NAME

  protected val coroutineScope: CoroutineScope
    get() =
      getCurrentActivity()
        ?.getCurrentFocus()
        ?.let { ViewTreeLifecycleOwner.get(it) }
        ?.lifecycleScope ?: GlobalScope

  protected fun getPrinter(id: Double, promise: Promise): ESCPOSPrinter? =
    printers.get(id.toInt()) ?: run {
      promise.reject(
        errorCode,
        ESCPOSConst.CMP_EX_DEV_NO_PRINTER.toString()
      )
      null
    }

  protected fun handleRejection(promise: Promise, error: Throwable) {
    promise.reject("ESCPOSPrinter", error)
  }

  protected fun ipToNumber(ip: String): Long =
    ip.split(".").fold(0L) { acc, s -> (acc shl 8) + s.toLong() }

  @ReactMethod
  override fun connect(
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      ESCPOSPrinter()
        .let { printer ->
          printer.setContext(context)

          connectType.toInt()
            .let { type ->
              when (type) {
                ESCPOSConst.CMP_PORT_WiFi -> {
                  port.toInt().takeIf { it > 0 }
                    ?.let { port ->
                      timeout.toInt().takeIf { it > 0 }
                        ?.let { timeout ->
                          printer.connect(type, address, port, timeout)
                        }
                        ?: printer.connect(type, address, port)
                    }
                    ?: printer.connect(type, address)
                }
                ESCPOSConst.CMP_PORT_Bluetooth,
                ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                  printer.connect(type, address)
                ESCPOSConst.CMP_PORT_USB -> {
                  val device: UsbDevice? = null
                  printer.connect(type, device)
                }
                else -> ESCPOSConst.CMP_E_ILLEGAL
              }
            }
            .takeIf { it != ESCPOSConst.CMP_SUCCESS }
            ?.let {
              promise.reject(
                errorCode,
                printer.getErrorCodeExtended()
                  .takeIf { it > 0 }
                  ?.toString()
                  ?: it.toString()
              )
            }
            ?: run {
              val id = printersId.incrementAndGet()

              printers.set(id, printer)
              promise.resolve(id)
            }
        }
    }
  }

  @ReactMethod
  override fun disconnect(id: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        disconnect()
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: run {
            printers.remove(id.toInt())
            promise.resolve(null)
          }
      }
    }
  }

  @ReactMethod
  override fun setEncoding(id: Double, encoding: String, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setEncoding(encoding)
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun printerCheck(id: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printerCheck()
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun status(id: Double, type: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        promise.resolve(
          type.toInt().takeIf { it > 0 }
            ?.let { status(it) }
            ?: status()
        )
      }
    }
  }

  @ReactMethod
  override fun printText(
    id: Double,
    data: String,
    alignment: Double,
    attribute: Double,
    textSize: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printText(
          data,
          alignment.toInt(),
          attribute.toInt(),
          textSize.toInt()
        )
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun printPaddingText(
    id: Double,
    data: String,
    attribute: Double,
    textSize: Double,
    length: Double,
    side: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printPaddingText(
          data,
          attribute.toInt(),
          textSize.toInt(),
          length.toInt(),
          side.toInt()
        )
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun printTextLocalFont(
    id: Double,
    data: String,
    alignment: Double,
    fontType: String,
    point: Double,
    style: Double,
    hRatio: Double,
    vRatio: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        when (fontType) {
          "DEFAULT" -> Typeface.DEFAULT
          "DEFAULT_BOLD" -> Typeface.DEFAULT_BOLD
          "MONOSPACE" -> Typeface.MONOSPACE
          "SANS_SERIF" -> Typeface.SANS_SERIF
          "SERIF" -> Typeface.SERIF
          else -> null
        }?.let {
          printTextLocalFont(
            data,
            alignment.toInt(),
            it,
            point.toInt(),
            style.toInt(),
            hRatio.toInt(),
            vRatio.toInt()
          )
            .takeIf { it != ESCPOSConst.CMP_SUCCESS }
            ?.let {
              promise.reject(
                errorCode,
                getErrorCodeExtended()
                  .takeIf { it > 0 }
                  ?.toString()
                  ?: it.toString()
              )
            }
            ?: promise.resolve(null)
        }
        ?: promise.reject(errorCode, ESCPOSConst.CMP_E_ILLEGAL.toString())
      }
    }
  }

  @ReactMethod
  override fun printBitmap(
    id: Double,
    data: String,
    width: Double,
    alignment: Double,
    mode: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      runCatching {
        Base64.decode(data, Base64.DEFAULT)
      }.onFailure {
        handleRejection(promise, it)
      }.onSuccess { bytes ->
        getPrinter(id, promise)?.apply {
          run {
            mode.takeIf { it > 0 }
              ?.let { it ->
                printBitmap(bytes, width.toInt(), alignment.toInt(), it.toInt())
              }
              ?: printBitmap(bytes, width.toInt(), alignment.toInt())
          }
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
        }
      }
    }
  }

  @ReactMethod
  override fun printBarCode(
    id: Double,
    data: String,
    symbology: Double,
    height: Double,
    width: Double,
    alignment: Double,
    textPosition: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printBarCode(
          data,
          symbology.toInt(),
          height.toInt(),
          width.toInt(),
          alignment.toInt(),
          textPosition.toInt()
        )
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun printPDF417(
    id: Double,
    data: String,
    digits: Double,
    steps: Double,
    moduleWidth: Double,
    stepHeight: Double,
    ECLevel: Double,
    alignment: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printPDF417(
          data,
          digits.toInt(),
          steps.toInt(),
          moduleWidth.toInt(),
          stepHeight.toInt(),
          ECLevel.toInt(),
          alignment.toInt()
        )
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun printQRCode(
    id: Double,
    data: String,
    moduleSize: Double,
    ECLevel: Double,
    alignment: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printQRCode(
          data,
          moduleSize.toInt(),
          ECLevel.toInt(),
          alignment.toInt()
        )
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun printGS1DataBarStacked(
    id: Double,
    data: String,
    symbology: Double,
    moduleSize: Double,
    maxSize: Double,
    alignment: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printGS1DataBarStacked(
          data,
          symbology.toInt(),
          moduleSize.toInt(),
          maxSize.toInt(),
          alignment.toInt()
        )
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun cutPaper(id: Double, type: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        cutPaper(type.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun unitFeed(id: Double, ufCount: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        unitFeed(ufCount.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun markFeed(id: Double, type: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        markFeed(type.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun openDrawer(
    id: Double,
    drawer: Double,
    pulseLen: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        openDrawer(drawer.toInt(), pulseLen.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun transactionPrint(id: Double, control: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        transactionPrint(control.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun rotatePrint(id: Double, rotation: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        rotatePrint(rotation.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun pageModePrint(id: Double, control: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        pageModePrint(control.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun clearPrintArea(id: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        clearPrintArea()
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun clearOutput(id: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        clearOutput()
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun printData(id: Double, data: String, promise: Promise) {
    coroutineScope.launch {
      runCatching {
        Base64.decode(data, Base64.DEFAULT)
      }.onFailure {
        handleRejection(promise, it)
      }.onSuccess {
        getPrinter(id, promise)?.apply {
          printData(it)
            .takeIf { it != ESCPOSConst.CMP_SUCCESS }
            ?.let {
              promise.reject(
                errorCode,
                getErrorCodeExtended()
                  .takeIf { it > 0 }
                  ?.toString()
                  ?: it.toString()
              )
            }
            ?: promise.resolve(null)
        }
      }
    }
  }

  @ReactMethod
  override fun printNormal(id: Double, data: String, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printNormal(data)
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun watermarkPrint(
    id: Double,
    start: Double,
    nvImageNumber: Double,
    pass: Double,
    feed: Double,
    repeat: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        watermarkPrint(
          start.toInt(),
          nvImageNumber.toInt(),
          pass.toInt(),
          feed.toInt(),
          repeat.toInt()
        )
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun printNVBitmap(
    id: Double,
    nvImageNumber: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        printNVBitmap(nvImageNumber.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun searchCitizenPrinter(connectType: Double, timeout: Double, promise: Promise) {
    coroutineScope.launch {
      val outErrors = IntArray(1)

      ESCPOSPrinter().apply {
        setContext(context)

        searchCitizenPrinter(connectType.toInt(), timeout.toInt(), outErrors)
          .sortedWith(
            compareBy { it: CitizenPrinterInfo -> ipToNumber(it.ipAddress) }
              .thenBy(String.CASE_INSENSITIVE_ORDER) { it.macAddress }
              .thenBy(String.CASE_INSENSITIVE_ORDER) { it.deviceName }
              .thenBy(String.CASE_INSENSITIVE_ORDER) { it.bdAddress }
          )
          .map {
            Arguments.createMap().apply {
              it.ipAddress
                ?.takeIf { it.isNotEmpty() }
                ?.let { putString("ipAddress", it) }

              it.macAddress
                ?.takeIf { it.isNotEmpty() }
                ?.let { putString("macAddress", it) }

              it.deviceName
                ?.takeIf { it.isNotEmpty() }
                ?.let { putString("deviceName", it) }

              it.bdAddress
                ?.takeIf { it.isNotEmpty() }
                ?.let { putString("bdAddress", it) }
            }
          }
          .takeIf {
            outErrors[0] == ESCPOSConst.CMP_SUCCESS ||
            outErrors[0] == ESCPOSConst.CMP_E_NO_LIST
          }
          ?.let {
            promise.resolve(Arguments.makeNativeArray(it.toList()))
          }
          ?: promise.reject(
            errorCode,
            getErrorCodeExtended()
              .takeIf { it > 0 }
              ?.toString()
              ?: outErrors[0].toString()
          )
      }
    }
  }

  @ReactMethod
  override fun searchESCPOSPrinter(connectType: Double, timeout: Double, promise: Promise) {
    coroutineScope.launch {
      val outErrors = IntArray(1)

      ESCPOSPrinter().apply {
        setContext(context)

        searchESCPOSPrinter(connectType.toInt(), timeout.toInt(), outErrors)
          .sortedBy { ipToNumber(it) }
          .takeIf {
            outErrors[0] == ESCPOSConst.CMP_SUCCESS ||
            outErrors[0] == ESCPOSConst.CMP_E_NO_LIST
          }
          ?.let {
            promise.resolve(Arguments.makeNativeArray(it.toList()))
          }
          ?: promise.reject(
            errorCode,
            getErrorCodeExtended()
              .takeIf { it > 0 }
              ?.toString()
              ?: outErrors[0].toString()
          )
      }
    }
  }

  @ReactMethod
  override fun printerCheckEx(
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      ESCPOSPrinter().apply {
        val outStatus = IntArray(1)

        setContext(context)

        connectType.toInt()
          .let { type ->
            when (type) {
              ESCPOSConst.CMP_PORT_WiFi -> {
                port.toInt().takeIf { it > 0 }
                  ?.let { port ->
                    timeout.toInt().takeIf { it > 0 }
                      ?.let { timeout ->
                        printerCheckEx(outStatus, type, address, port, timeout)
                      }
                      ?: printerCheckEx(outStatus, type, address, port)
                  }
                  ?: printerCheckEx(outStatus, type, address)
              }
              ESCPOSConst.CMP_PORT_Bluetooth,
              ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                printerCheckEx(outStatus, type, address)
              ESCPOSConst.CMP_PORT_USB -> {
                val device: UsbDevice? = null
                printerCheckEx(outStatus, type, device)
              }
              else -> ESCPOSConst.CMP_E_ILLEGAL
            }
          }
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(outStatus[0])
      }
    }
  }

  @ReactMethod
  override fun openDrawerEx(
    drawer: Double,
    pulseLen: Double,
    connectType: Double,
    address: String,
    port: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      ESCPOSPrinter().apply {
        val intDrawer = drawer.toInt()
        val intPulseLen = pulseLen.toInt()

        setContext(context)

        connectType.toInt()
          .let { type ->
            when (type) {
              ESCPOSConst.CMP_PORT_WiFi -> {
                port.toInt().takeIf { it > 0 }
                  ?.let { port ->
                    timeout.toInt().takeIf { it > 0 }
                      ?.let { timeout ->
                        openDrawerEx(intDrawer, intPulseLen, type, address, port, timeout)
                      }
                      ?: openDrawerEx(intDrawer, intPulseLen, type, address, port)
                  }
                  ?: openDrawerEx(intDrawer, intPulseLen, type, address)
              }
              ESCPOSConst.CMP_PORT_Bluetooth,
              ESCPOSConst.CMP_PORT_Bluetooth_Insecure ->
                openDrawerEx(intDrawer, intPulseLen, type, address)
              ESCPOSConst.CMP_PORT_USB -> {
                val device: UsbDevice? = null
                openDrawerEx(intDrawer, intPulseLen, type, device)
              }
              else -> ESCPOSConst.CMP_E_ILLEGAL
            }
          }
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun setPrintCompletedTimeout(
    id: Double,
    timeout: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setPrintCompletedTimeout(timeout.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun setLog(
    id: Double,
    mode: Double,
    path: String,
    maxSize: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setLog(mode.toInt(), path, maxSize.toInt())
        promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun getVersionCode(promise: Promise) {
    ESCPOSPrinter().apply {
      setContext(context)
      promise.resolve(getVersionCode())
    }
  }

  @ReactMethod
  override fun getVersionName(promise: Promise) {
    ESCPOSPrinter().apply {
      setContext(context)
      promise.resolve(getVersionName())
    }
  }

  @ReactMethod
  override fun getPageModeArea(id: Double, promise: Promise) {
    getPrinter(id, promise)
      ?.getPageModeArea()
      .let { promise.resolve(it) }
  }

  @ReactMethod
  override fun getPageModePrintArea(id: Double, promise: Promise) {
    getPrinter(id, promise)
      ?.getPageModePrintArea()
      .let { promise.resolve(it) }
  }

  @ReactMethod
  override fun setPageModePrintArea(id: Double, area: String, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setPageModePrintArea(area)
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun getPageModePrintDirection(id: Double, promise: Promise) {
    getPrinter(id, promise)
      ?.getPageModePrintDirection()
      .let { promise.resolve(it) }
  }

  @ReactMethod
  override fun setPageModePrintDirection(
    id: Double,
    direction: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setPageModePrintDirection(direction.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun getPageModeHorizontalPosition(id: Double, promise: Promise) {
    getPrinter(id, promise)
      ?.getPageModeHorizontalPosition()
      .let { promise.resolve(it) }
  }

  @ReactMethod
  override fun setPageModeHorizontalPosition(
    id: Double,
    position: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setPageModeHorizontalPosition(position.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun getPageModeVerticalPosition(id: Double, promise: Promise) {
    getPrinter(id, promise)
      ?.getPageModeVerticalPosition()
      .let { promise.resolve(it) }
  }

  @ReactMethod
  override fun setPageModeVerticalPosition(
    id: Double,
    position: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setPageModeVerticalPosition(position.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun getRecLineSpacing(id: Double, promise: Promise) {
    getPrinter(id, promise)
      ?.getRecLineSpacing()
      .let { promise.resolve(it) }
  }

  @ReactMethod
  override fun setRecLineSpacing(
    id: Double,
    spacing: Double,
    promise: Promise
  ) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setRecLineSpacing(spacing.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }

  @ReactMethod
  override fun getMapMode(id: Double, promise: Promise) {
    getPrinter(id, promise)
      ?.getMapMode()
      .let { promise.resolve(it) }
  }

  @ReactMethod
  override fun setMapMode(id: Double, mode: Double, promise: Promise) {
    coroutineScope.launch {
      getPrinter(id, promise)?.apply {
        setMapMode(mode.toInt())
          .takeIf { it != ESCPOSConst.CMP_SUCCESS }
          ?.let {
            promise.reject(
              errorCode,
              getErrorCodeExtended()
                .takeIf { it > 0 }
                ?.toString()
                ?: it.toString()
            )
          }
          ?: promise.resolve(null)
      }
    }
  }
}
