package org.praxisinstitute.isncsci;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import android.webkit.WebView;
import android.webkit.WebSettings;

public class MainActivity extends BridgeActivity {

    @Override
    public void onStart() {
        super.onStart();

        WebView webView = (WebView) this.bridge.getWebView();
        WebSettings webSettings = webView.getSettings();

        // force textZoom to 100% (font to be const size - accessibiluty is off)
        webSettings.setTextZoom(100);
    }
}
