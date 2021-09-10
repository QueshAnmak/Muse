import pathlib
from winreg import CreateKey, HKEY_CURRENT_USER, SetValue, REG_SZ, CloseKey


def keymaker():

    pathToManifest = str(pathlib.Path().resolve())[:-4] + r'app\manifest.json'
    subkey = r'Software\Google\Chrome\NativeMessagingHosts\com.queshanmak.muse'

    SetValue(HKEY_CURRENT_USER, subkey, REG_SZ, pathToManifest)
