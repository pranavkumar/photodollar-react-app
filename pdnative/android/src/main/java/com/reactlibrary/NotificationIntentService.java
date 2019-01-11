package com.reactlibrary;

import android.app.IntentService;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;
import android.widget.Toast;

public class NotificationIntentService extends IntentService {

    public NotificationIntentService(String name) {
        super(name);

    }

    public NotificationIntentService() {
        super(null);
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) throws NullPointerException {
        Log.d("NotService", "notification service gets intent");
        Log.d("selection", intent.getAction());

        Intent rintent = new Intent();
        rintent.setAction("notificationAction");

        switch (intent.getAction()) {
            case "reply":

                rintent.putExtra("next", "reply");

                LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(rintent);
                break;
            case "forward":
                rintent.putExtra("next", "forward");
                LocalBroadcastManager.getInstance(getApplicationContext()).sendBroadcast(rintent);
                break;
        }
    }
}
