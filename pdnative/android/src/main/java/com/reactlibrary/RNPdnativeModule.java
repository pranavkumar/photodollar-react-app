
package com.reactlibrary;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.admin.DevicePolicyManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.widget.RemoteViews;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.target.BitmapImageViewTarget;
import com.bumptech.glide.request.target.NotificationTarget;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;
import java.lang.reflect.Array;
import java.net.URL;

import javax.annotation.Nullable;


public class RNPdnativeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public RNPdnativeModule(final ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("notificationAction");
        LocalBroadcastManager.getInstance(reactContext).registerReceiver(new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                Log.d("next_is", intent.getStringExtra("next"));
                RNPdnativeModule.sendEvent(reactContext, "notifying", intent.getStringExtra("next"));
            }
        }, intentFilter);
    }

    @ReactMethod
    public void show(String msg) {
        Toast.makeText(reactContext, msg, Toast.LENGTH_SHORT).show();
    }



    @ReactMethod
    public void showNotification(ReadableMap notificationObj, Promise promise) throws IOException, NullPointerException {
        try {
            String uRequestId = notificationObj.getString("uRequestId");
            String uRequestTitle = notificationObj.getString("uRequestTitle");
            String uUserName = notificationObj.getString("uUserName");
            ReadableArray uResponseImages = notificationObj.getArray("uResponseImages");


            sendEvent(reactContext, "notifying", "i am notifying");


            final RemoteViews remoteViews = new RemoteViews(reactContext.getPackageName(), R.layout.imagenotification);
            remoteViews.setTextViewText(R.id.intitle, uRequestTitle);
            remoteViews.setTextViewText(R.id.inappname, "PhotoDollar");

            URL url = new URL("https://www.plated.com/morsel/wp-content/uploads/2015/11/platedpic.jpg");
            Bitmap image = BitmapFactory.decodeStream(url.openConnection().getInputStream());
            remoteViews.setImageViewBitmap(R.id.inicon, image);

            Intent replyIntent = new Intent(reactContext, NotificationIntentService.class);
            replyIntent.setAction("reply");
            Intent forwardIntent = new Intent(reactContext, NotificationIntentService.class);
            forwardIntent.setAction("forward");
            remoteViews.setOnClickPendingIntent(R.id.inreply, PendingIntent.getService(reactContext, 0, replyIntent, PendingIntent.FLAG_UPDATE_CURRENT));
            remoteViews.setOnClickPendingIntent(R.id.inforward, PendingIntent.getService(reactContext, 0, forwardIntent, PendingIntent.FLAG_UPDATE_CURRENT));


            NotificationManager notificationManager = (NotificationManager) getCurrentActivity().getSystemService(Context.NOTIFICATION_SERVICE);
            NotificationCompat.Builder mBuilder = new NotificationCompat.Builder(reactContext, "123");
            mBuilder.setContent(remoteViews)
                    .setAutoCancel(true)
                    .setSmallIcon(android.support.compat.R.drawable.notification_icon_background);

            final Notification notification = mBuilder.build();
            // set big content view for newer androids
            if (android.os.Build.VERSION.SDK_INT >= 16) {
                notification.bigContentView = remoteViews;
            }


            notificationManager.notify(0, notification);

            promise.resolve(null);

        } catch (RuntimeException e) {
            promise.reject(e);
        }
    }

    public static void sendEvent(Context context, String eventName, @Nullable Object data) {
        ((ReactContext) context)
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, data);
    }


    @Override
    public String getName() {
        return "RNPdnative";
    }
}