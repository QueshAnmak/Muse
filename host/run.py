from host.src.native_msg import get_message, encode_message, send_message
from subprocess import Popen
from pathlib import Path

if __name__ == '__main__':

    meetLink = get_message()
    pathToBot = str(Path().resolve())[:-4] + r'app/bot.js'

    # open bot with node as a child process
    with Popen(['node', pathToBot, 'start', f'--link="{meetLink}"']) as botProcess:

        send_message(encode_message('Got the link , starting Muse!'))

        # second msg tells stop bot, wait till it is sent.
        get_message()
        send_message(encode_message('Alright, Shutting down.'))
        botProcess.kill()
