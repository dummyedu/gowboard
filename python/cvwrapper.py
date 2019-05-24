
import cv2
import numpy as np

def detectImage(target, template, options):
  threshold = options.get('threshold')
  detectType = cv2.TM_CCOEFF_NORMED
  algo_type = options.get('algo_type')
  grey = options.get('grey')
  if algo_type == 1:
    detectType = cv2.TM_SQDIFF_NORMED
  h, w = template.shape[:-1]
  if grey:
    res = cv2.matchTemplate(cv2.cvtColor(target, cv2.COLOR_BGR2GRAY),
      cv2.cvtColor(template, cv2.COLOR_BGR2GRAY), detectType)
  else:
    res = cv2.matchTemplate(target, template, detectType)

  minMatch = np.min(res)
  maxMatch = np.max(res)
  print ('minMatch = ', minMatch, " maxMatch = ", maxMatch)
  threshold = max(maxMatch - 0.1, threshold)
  added = []

  loc = []
  if algo_type == 0:
    loc = np.where(res >= threshold)
  elif algo_type == 1:
    loc = np.where(res <= 1 - threshold)

  print ('detectCount = ', len(loc[0]))

  if len(loc[0]) > 2000:
    print ('detect too much, threshold or detectType is wrong.', threshold, detectType)
    return {
      'width': w,
      'height': h,
      'matches': []
    }

  matches = []
  for pt in zip(*loc[::-1]):  # Switch collumns and rows
    if algo_type == 0:
      matches.append((int(pt[0]), int(pt[1]), (float)(res[pt[1]][pt[0]])))
      # matches.append({
      #   'x': int(pt[0]),
      #   'y': int(pt[1]),
      #   'v': (float)(res[pt[1]][pt[0]])
      # })
    elif algo_type == 1:
      matches.append((int(pt[0]), int(pt[1]), 1 - (float)(res[pt[1]][pt[0]])))
      # matches.append({
      #   'x': int(pt[0]),
      #   'y': int(pt[1]),
      #   'v': 1 - (float)(res[pt[1]][pt[0]])
      # })

  ret = {}
  ret['width'] = w
  ret['height'] = h
  ret['matches'] = matches
  return ret

def detectImageByPath(target_path, template_path, options):
  return detectImage(cv2.imread(target_path), cv2.imread(template_path), options)

