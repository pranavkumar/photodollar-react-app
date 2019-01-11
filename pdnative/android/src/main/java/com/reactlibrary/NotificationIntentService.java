package com.reactlibrary;

import android.app.IntentService;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

public class NotificationIntentService extends IntentService {
    public NotificationIntentService(String name) {
        super(name);

    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) throws NullPointerException{
        Log.d("NotificationIntentService","notification service gets intent");
        switch (intent.getAction()){
            case "reply":
                RNPdnativeModule.sendEvent(getApplicationContext(),"notifying","wants to reply");
                break;
            case "forward":
                RNPdnativeModule.sendEvent(getApplicationContext(),"notifying","wants to forward");
                break;
        }
    }
}
