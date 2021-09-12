from sys import stderr, stdin, stdout
from src.native_msg import get_message, encode_message, send_message
from subprocess import PIPE, Popen
from signal import SIGINT

# print = lambda x: send_message(encode_message(x))

if __name__ == '__main__':

    meetLink = get_message()
    startBotCmd = ['node', './app/bot.js', 'start', f'--link="{meetLink}"']

    # open bot with node as a child process
    send_message(encode_message(f'Starting Muse at {meetLink}.'))
    with Popen(startBotCmd, stdin=PIPE, stdout=PIPE) as botProcess:

        send_message(encode_message('Muse running.'))
        
        # second msg tells stop bot, wait till it is sent.
        if get_message() or botProcess.wait():
            send_message(encode_message('Shutting down.'))
    
    send_message(encode_message('Muse off.'))

    

        
