import pathlib
from winreg import CreateKey, HKEY_CURRENT_USER, SetValue, REG_SZ, CloseKey


def keymaker():

    pathToManifest = str(pathlib.Path().resolve()) + r'\manifest.json'
    subkey = r'Software\Google\Chrome\NativeMessagingHosts\com.queshanmak.muse'
    print(pathToManifest)
    SetValue(HKEY_CURRENT_USER, subkey, REG_SZ, pathToManifest)

if __name__ == '__main__':
    keymaker()