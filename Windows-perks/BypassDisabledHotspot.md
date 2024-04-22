In corporates they often disable hotspot abilities so you can't use the internet in your phone and we know that this is such a pain in the long run.
the solution is quite easy all you need to do is:

Windows 10 users can use the mobile hotspot to share a Wi-Fi, Ethernet, or cellular data connection. In this tutorial, we show you how to enable or disable the mobile hotspot.

Click Start > Settings > Network & internet. Click on Mobile hotspot.

Toggle the mobile hotspot on or off at the top.

![alt text](image.png)

If you're having problems turning on the mobile hotspot, we can check the registry.

Open regedit and go to HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\Network Connections.

Create a New > DWORD (32-bit Value) and name that NC_ShowSharedAccessUI.

Double-click NC_ShowSharedAccessUI and change the Value data to 1.

To turn off the mobile hotspot, you can either delete the key or change the Value data to 0.

[Information Source](https://www.majorgeeks.com/content/page/enable_or_disable_mobile_hotspot_in_windows_10.html).
