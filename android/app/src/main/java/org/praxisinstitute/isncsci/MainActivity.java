package org.praxisinstitute.isncsci;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
     @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Set WebView text zoom to 100%
    getBridge().getWebView().getSettings().setTextZoom(100);
  }
}
