export var geoCoord = {
  'Gansu': [103.73, 36.03],
  'Qinghai': [101.74, 36.56],
  'Sichuan': [104.06, 30.67],
  'Hebei': [114.48, 38.03],
  'Yunnan': [102.73, 25.04],
  'Guizhou': [106.71, 26.57],
  'Hubei': [114.31, 30.52],
  'Henan': [113.65, 34.76],
  'Shandong': [117, 36.65],
  'Jiangsu': [118.78, 32.04],
  'Anhui': [117.27, 31.86],
  'Zhejiang': [120.19, 30.26],
  'Jiangxi': [115.89, 28.68],
  'Fujian': [119.3, 26.08],
  'Guangdong': [113.23, 23.16],
  'Hunan': [113, 28.21],
  'Hainan': [110.35, 20.02],
  'Liaoning': [123.38, 41.8],
  'Jilin': [125.35, 43.88],
  'Heilongjiang': [126.63, 45.75],
  'Shanxi': [112.53, 37.87],
  'Shaanxi': [108.95, 34.27],
  'Taiwan': [121.30, 25.03],
  'Beijing': [116.46, 39.92],
  'Shanghai': [121.48, 31.22],
  'Chongqing': [106.54, 29.59],
  'Tianjin': [117.2, 39.13],
  'Inner Mongolia': [111.65, 40.82],
  'Guangxi': [108.33, 22.84],
  'Tibet': [91.11, 29.97],
  'Ningxia': [106.27, 38.47],
  'Xinjiang': [87.68, 43.77],
  'Hong Kong': [114.17, 22.28],
  'Macao': [113.54, 22.19]
};

export var provinceValue = [
  { name: 'Gansu', value: 36 },
  { name: 'Qinghai', value: 30 },
  { name: 'Sichuan', value: 50 },
  { name: 'Hebei', value: 38 },
  { name: 'Yunnan', value: 25 },
  { name: 'Guizhou', value: 22 },
  { name: 'Hubei', value: 45 },
  { name: 'Henan', value: 55 },
  { name: 'Shandong', value: 180 },
  { name: 'Jiangsu', value: 65 },
  { name: 'Anhui', value: 86 },
  { name: 'Zhejiang', value: 26 },
  { name: 'Jiangxi', value: 68 },
  { name: 'Fujian', value: 18 },
  { name: 'Guangdong', value: 16 },
  { name: 'Hunan', value: 21 },
  { name: 'Hainan', value: 23 },
  { name: 'Liaoning', value: 80 },
  { name: 'Jilin', value: 88 },
  { name: 'Heilongjiang', value: 75 },
  { name: 'Shanxi', value: 87 },
  { name: 'Shaanxi', value: 27 },
  { name: 'Taiwan', value: 0 },
  { name: 'Beijing', value: 92 },
  { name: 'Shanghai', value: 22 },
  { name: 'Chongqing', value: 59 },
  { name: 'Tianjin', value: 13 },
  { name: 'Inner Mongolia', value: 82 },
  { name: 'Guangxi', value: 84 },
  { name: 'Tibet', value: 50 },
  { name: 'Ningxia', value: 47 },
  { name: 'Xinjiang', value: 77 },
  { name: 'Hong Kong', value: 0 },
  { name: 'Macao', value: 0 }
]

export function convertData() {
  return provinceValue.map((item) => {
    return {
      name: item.name,
      value: geoCoord[item.name].concat(item.value)
    }
  })
}
