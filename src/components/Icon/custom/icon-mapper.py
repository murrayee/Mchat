#!/usr/bin/python
# -*- coding: utf-8 -*-
import sys
import os


from fontTools.ttLib import TTFont

tmpl = """
let map = {%s};
;module.exports = (name)=>String.fromCharCode(map[name]);
;module.exports.map = map;
"""


def main(fontFile, output):
    try:
        font = TTFont(fontFile)
        glyphMap = font["cmap"].getcmap(3, 1).cmap
        tmp = ""
        for k in glyphMap:
            tmp += '"%s":%d,' % (glyphMap[k], k)

        f = open(output, "w+")
        f.write(tmpl % tmp)
        f.close()
    except Exception as e:
        print (e)


def showHelp():
    print('')
"""
Iconfont map generator.

usage: 
iconfont-maper <iconfont> <output>      generate map file from iconfont file .
iconfont-maper -h                       show this help.
"""

if __name__ == '__main__':
    if len(sys.argv) < 2:
        showHelp()
        sys.exit()

    if len(sys.argv) == 2 and sys.argv[1] == "-h":
        showHelp()
        sys.exit()

    if len(sys.argv) > 2:
        if os.path.exists(sys.argv[1]):
            main(sys.argv[1], sys.argv[2])
        else:
            print ("Font file not found.")

        sys.exit()
