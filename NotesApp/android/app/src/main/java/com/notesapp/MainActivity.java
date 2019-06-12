package com.notesapp;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.pgsqlite.SQLitePluginPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

public class MainActivity extends ReactActivity implements  DefaultHardwareBackBtnHandler {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */


    private ReactInstanceManager mReactInstanceManager;
    private ReactRootView mReactRootView;

    @Override
    protected String getMainComponentName() {
        return "NotesApp";
    }

//    @Override
//    protected void onCreate(Bundle savedInstanceState) {
//        super.onCreate(savedInstanceState);
//        mReactRootView = new ReactRootView(this);
//        mReactInstanceManager = ReactInstanceManager.builder()
//                .setApplication(getApplication())
//                .setBundleAssetName("index.bundle")  // this is dependant on how you name you JS files, example assumes index.android.js
//                .setJSMainModulePath("index")
//                .addPackage(new MainReactPackage())
//                .addPackage(new SQLitePluginPackage())       // register SQLite Plugin here
//                .setUseDeveloperSupport(BuildConfig.DEBUG)
//                .setInitialLifecycleState(LifecycleState.RESUMED)
//                .build();
//        mReactRootView.startReactApplication(mReactInstanceManager, "NotesApp", null); //change "AwesomeProject" to name of your app
//        setContentView(mReactRootView);
//    }
}
