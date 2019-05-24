import numpy as np
import cv2
import cvwrapper
import os
import sys
import json

screenImage = None

templates = []
dir_path = os.path.dirname(os.path.realpath(__file__))
names = ['0_red.png', '1_purple.png', '2_blue.png', '3_green.png', '4_gold.png',
  '5_brown.png', '6_skull.png', '7_block.png', '8_doom.png']

def resizeImg(img, targetSize):
  ratio = img.shape[0] / float(targetSize)
  x = (int)(img.shape[1] / ratio)
  y = (int)(img.shape[0] / ratio)

  img = cv2.resize(img, (x, y))
  return img

for name in names:
  filePath = os.path.join(dir_path, "template/" + name)
  img = cv2.imread(filePath)
  print img.shape
  # img = resizeImg(img, 42)
  templates.append(img)

def detect(imagePath):
  # 1. read image
  img = cv2.imread(imagePath)
  print("original image shape", img.shape)

  # img = cv2.resize(img, (x, y))
  img = resizeImg(img, 380)
  print("regular image shape", img.shape)

  # 2. for each all patterns. get result
  options = {
    'threshold': 0.5,
    'algo_type': 0
  }
  results = []
  colors = [
    (255, 0, 0), (112, 20, 182), (0, 0, 255), (0, 255, 0), (252, 224, 132), (113, 76, 72), (255, 255, 255), (113, 133, 121), (225, 142, 131)
  ]
  for i in range(len(colors)):
    colors[i] = (colors[i][2], colors[i][1], colors[i][0])
  for i, t in enumerate(templates):
    r = cvwrapper.detectImage(img, t, options)
    results.append(r)
    # for m in r['matches']:
    #   top_left = (m['x'], m['y'])
    #   bottom_right = (top_left[0] + t.shape[1], top_left[1] + t.shape[0])
    #   cv2.rectangle(img, top_left, bottom_right, colors[i], 2)

  # cv2.imwrite('res.png',img)

  # 3. get roi from all patterns.
  xrange = [1000, -1000]
  yrange = [1000, -1000]
  for r in results:
    for m in r['matches']:
      if xrange[0] > m[0]:
        xrange[0] = m[0]
      if xrange[1] < m[0]:
        xrange[1] = m[0]
      if yrange[0] > m[1]:
        yrange[0] = m[1]
      if yrange[1] < m[1]:
        yrange[1] = m[1]
  cell_size = min((xrange[1] - xrange[0]) / 7, (yrange[1] - yrange[0]) / 7) - 2

  print xrange, yrange

  # 4. by the roi to make rough points for each pattern
  board = np.zeros(64).reshape(8, 8)
  p = np.zeros(64).reshape(8, 8)
  for i, r in enumerate(results):
    for (x, y, v) in r['matches']:
      index = (y / cell_size, x / cell_size)
      if v > p[index]:
        p[index] = v
        board[index] = i

  return board.reshape(64).astype(int).tolist()

if __name__ == "__main__":
  if len(sys.argv) > 1:
    l = detect(sys.argv[1])
    if len(sys.argv) > 2:
      with open(sys.argv[2], 'w') as outfile:
        json.dump(l, outfile)
