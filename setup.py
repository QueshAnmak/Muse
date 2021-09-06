from distutils.core import setup
import py2exe

setup(
    console=['runner.py'],
    options={
        "py2exe": {
            bundles_files: 1,
            
        }
    }
)
