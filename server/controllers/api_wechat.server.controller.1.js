var dic = {
  '冰草': [
    { title: '有机与否', list: ['有机', '无公害', '普通'] },
    { title: '货品等级', list: ['一级', '二级', '三级'] }
  ],
  '宝塔菜': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '货品状态', list: ['带泥', '不带泥'] },
    { title: '货品形态', list: ['鲜货', '干活'] },
  ],
  '扁豆': [
    { title: '长度', list: ['10cm以下', '10cm以上', '15cm以上', '20cm以上'] },
    { title: '宽度', list: ['1cm以上', '2cm以上', '3cm以上'] },
    { title: '饱满度', list: ['饱满', '较饱满', '不饱满'] },
  ],
  '包菜': [
    { title: '单个重', list: ['0.5斤以下', '0.5-1斤', '1.0-1.5斤', '1.5-2.0斤', '2.0-2.5斤', '2.5-3.0斤', '3.0-3.5斤', '3.5-4.0斤', '4-5斤', '5-6斤', '6斤以上'] },
    { title: '直径', list: ['10 - 15cm, 15 - 20cm, 20 - 25cm, 25cm以上'] },
    { title: '货品包装', list: ['薄膜袋', '纸箱', '编织袋'] },
    { title: '种植环境', list: ['大棚种植', '露地种植'] },
  ],
  '板薯': [
    { title: '单颗重', list: ['2两以下', '2-5两', '0.5-1斤', '1斤以上', '2斤以上'] },
    { title: '品种属性', list: ['白心', '紫心'] },
  ],
  '白菜': [
    { title: '单棵重', list: ['1斤以下', '1-2斤', '2-3斤', '3-6斤', '6-10斤', '10-15斤', '15斤以上'] },
    { title: '货品状态', list: ['毛菜', '净菜', '二毛菜'] },
    { title: '株高', list: ['10 - 15cm, 15 - 20cm, 20 - 25cm, 25 - 30cm, 30 - 35cm, 35 - 40cm, 40 - 45cm, 45cm以上'] },
    { title: '货品等级', list: ['一级', '两级', '等外'] },
    { title: '货品包装', list: ['薄膜袋', '网袋', '包纸', '泡沫箱'] },
    { title: '储存方式', list: ['冷库货', '鲜货', '窖藏'] },
    { title: '种植环境', list: ['大棚环境', '露地种植'] },
  ],
  '菠菜': [
    { title: '叶长', list: ['10cm以下', '10-15cm,15-20cm,20-25cm,25-30cm,30-35cm,35-40cm,40cm以上'] },
    { title: '种植环境', list: ['大棚环境', '露地种植'] },
  ],
  '茶树菇': [
    { title: '菌柄长度', list: ['4-6cm,6-8cm,8-10cm,10-12cm,12-14cm,14-16cm,16cm以上'] },
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
    { title: '货品状态', list: ['干货', '鲜货'] },
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
  ],
  '莼菜': [
    { title: '货品包装', list: ['散装', '袋装'] },
    { title: '净重', list: ['500g以下', '500 - 1kg, 1kg - 2kg, 2kg - 5kg, 5kg以上'] },
  ],
  '刺老芽': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '种植环境', list: ['露天', '大棚'] },
    { title: '货品状态', list: ['干货', '鲜货'] },
  ],
  '慈菇': [
    { title: '单个重', list: ['10-20g,20-30g,30-50g,50-70g,70g以上'] },
    { title: '是否水洗', list: ['净果', '带泥'] },
  ],
  '菜苔': [
    { title: '株高', list: ['10cm以上,10-15cm,15-20cm,20-25cm,25-30cm,30-35cm,35-40cm,40cm以上'] },
    { title: '平均直径', list: ['1 - 2cm, 2 - 3cm, 3cm以上'] },
    { title: '货品包装', list: ['框装', '泡沫箱'] },
    { title: '种植环境', list: ['露天种植', '大棚种植'] },
  ],
  '地莲花': [
    { title: '培育方式', list: ['野生', '人工种植'] }
  ],
  '地皮菜': [
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
    { title: '货品状态', list: ['干货', '鲜货'] },
  ],
  '刀豆': [
    { title: '长度', list: ['10cm以下', '10-15cm', '15-20cm', '20-25cm', '25cm以上'] },
    { title: '新鲜度', list: ['无斑点', '有斑点'] },
  ],
  '豆角': [
    { title: '长度', list: ['6-8cm以上', '6-15cm以上', '15cm以上', '20cm以上', '30cm以上', '40cm以上', '50cm以上', '60cm以上', '70cm以上', '80cm以上'] },
    { title: '是否打冷', list: ['打冷', '不打冷'] },
    { title: '表皮颜色', list: ['青绿色', '紫色', '其他'] },
    { title: '储存方式', list: ['窖藏', '冷库', '鲜货'] },
    { title: '货品特级', list: ['特级', '一级', '二级', '统货'] },
  ],
  '大蒜': [
    { title: '平均直径', list: ['4.5cm', '4.5-5.0cm', '5.0cm', '5-5.5cm', '5.5cm', '5.5-6.0cm', '6.0cm', '6.0-6.5cm'] },
    { title: '混级统货', list: ['1.8cm', '2.2 - 2.5cm', '2.8cm', '3.2 - 3.8cm'] },
    { title: '瓣型', list: ['四六瓣', '独头', '非独头', '多瓣蒜'] },
    { title: '瓣形状型', list: ['蒜球', '未剥皮蒜瓣', '剥皮蒜瓣'] },
    { title: '储藏方法', list: ['窖藏', '冷库', '鲜货'] },
    { title: '类型', list: ['新蒜', '老蒜'] },
    { title: '干度', list: ['鲜蒜', '干蒜'] },
  ],
  '大葱': [
    { title: '葱白长度', list: ['25cm以下', '25-30cm', '30-40cm', '40cm以上'] },
    { title: '净度', list: ['净葱', '毛葱'] },
    { title: '粗细', list: ['1cm左右', '2cm左右', '3cm左右'] },
    { title: '储存方式', list: ['窖藏', '冷库', '鲜货'] },
  ],
  '豆芽': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '长度', list: ['5cm以下', '5-10cm', '10-15cm', '15-20cm', '20cm以上'] },
    { title: '种植环境', list: ['温室', '露天'] },
  ],
  '冬瓜': [
    { title: '单个重', list: ['0.8-1.2斤', '2斤以上', '5斤以上', '8斤以上', '10斤以上', '20斤以上', '25斤以上', '30斤以上', '40斤以上'] },
    { title: '表皮', list: ['黑皮', '硬毛', '白霜'] },
    { title: '果型', list: ['大果型', '小果型'] },
    { title: '种植方式', list: ['吊冬瓜', '地冬瓜'] },
    { title: '储藏方式', list: ['窖藏', '冷库', '鲜货'] },
  ],
  '竹笋': [
    { title: '长度', list: ['9cm以下', '9-13cm', '13-17cm', '17-21cm', '21-25cm', '25-30cm', '30cm以上'] },
    { title: '单个重', list: ['2两以下', '2两以上', '3两以上', '5两以上', '6两以上', '1斤以上'] },
    { title: '货品状态', list: ['笋干', '鲜笋'] },
    { title: '货品类别', list: ['统货', '除根货'] },
  ],
  '儿菜': [
    { title: '单颗重', list: ['0.5斤以下', '0.5-1.0斤', '1.0-1.5斤', '1.5-2.0斤', '2.0斤以上'] }
  ],
  '发菜': [
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
    { title: '类型', list: ['干货', '鲜货'] },
  ],
  '佛手瓜': [
    { title: '单个重', list: ['2两以上', '3两以上', '4两以上', '5两以上', '6两以上', '7两以上'] },
    { title: '货品包装', list: ['纸箱装', '透明编织袋'] },
  ],
  '葛根': [
    { title: '单个重', list: ['0.5-1.0斤', '1.0-1.5斤', '1.5-2.0斤', '2.0-2.5斤', '2.5-3.0斤', '3.0-3.5斤', '3.5-4.0斤', '4.0-4.5斤', '4.5斤以上'] },
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
    { title: '分类', list: ['干货', '鲜货'] },
  ],
  '红薯叶': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '种植环境', list: ['露天', '温室'] },
  ],
  '葫芦': [
    { title: '单个重', list: ['0.3斤以上', '0.5斤以上', '1斤以上', '1.5斤以上', '2斤以上'] },
    { title: '单个货品包装重', list: [' 散装', '袋装', '箱装'] },
    { title: '货品等级', list: ['统货', '一级', '二级'] },
  ],
  '黄花菜': [
    { title: '货品等级', list: ['一级', '二级', '三级', '特级'] },
    { title: '货品包装', list: ['散装', '袋装'] },
  ],
  '荷兰豆': [
    { title: '长度', list: ['2-3cm', '3-4cm', '4-5cm', '5-6cm', '6-7cm', '7-8cm', '8-9cm', '9-10cm', '10-12cm', '12cm以上'] },
    { title: '新鲜度', list: ['有斑点', '无斑点'] },
  ],
  '花椰菜': [
    { title: '松散度', list: ['紧密', '适中', '松散'] },
    { title: '单个重', list: ['1斤以下', '1-2斤', '2-3斤', '3-4斤', '4-5斤', '5斤以上'] },
    { title: '颜色', list: ['米黄色', '乳白色', '紫红色'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] },
    { title: '类型', list: ['大米粒', '小米粒'] },
    { title: '成长天数', list: ['成长60天', ' 成长70天', '成长80天', '成长30天', '成长120天'] },
    { title: '货品等级', list: ['一级', '两级', '次品'] },
  ],
  '黄瓜': [
    { title: '长度', list: ['18cm以下', '18-22cm', '22-25cm', '25-30cm', '30cm以上'] },
    { title: '表皮', list: ['鲜花带刺', '干花带刺'] },
    { title: '粗细', list: ['2cm以下', '2-2.5cm', '2.5-3cm', '3-3.5cm', '3.5-4.5cm', '4.5-5.0cm', '5.0cm以上'] },
    { title: '颜色', list: ['油绿', '翠绿'] },
  ],
  '胡萝卜': [
    { title: '长度', list: ['10cm以下', '10-15cm', '15cm以上'] },
    { title: '单个重', list: ['2两以下', '2两以上', '3两以上', '4两以上', '5两以上', '9两以上', '6两以上', '7两以上', '8两以上'] },
    { title: '直径', list: ['3cm以下', '3 - 4cm', '4 - 5cm', '5cm以上'] },
    { title: '颜色', list: ['黄', '橙', '橙红', '紫', '其他'] },
    { title: '货品包装', list: ['袋装', '箱装'] },
    { title: '储藏方法', list: ['窖藏', '冷库', '鲜货'] },
    { title: '是否水洗', list: ['水洗', '带泥'] },
  ],
  '红薯': [
    { title: '单个重', list: ['1-3两', '3两以上', '4两以上', '5两以上', '6两以上', '8两以上', '3-8两', '8两-1.2斤', '1.2斤以上', '混装统货'] },
    { title: '表皮颜色', list: ['红皮', '白皮', '紫皮', '黄皮'] },
    { title: '薯心颜色', list: ['红心', '白心', '紫心', '黄心'] },

    { title: '货品包装', list: ['纸箱', '编织袋', '塑框'] },
    { title: '储藏方法', list: ['窖藏', '冷库', '鲜货'] },
    { title: '货品类别', list: ['小红薯', '商品薯', '加工薯'] },
  ],
  '金针菇': [
    { title: '菌柄长度', list: ['8-10cm,10-15cm,15-20cm,20-25cm,25以上'] },
    { title: '菌盖直径', list: ['0.5-1.2cm', '1.2-1.5cm', '1.5-2.0cm'] },
    { title: '菌柄粗度', list: ['1.5cm以下', '1.5-2.0cm', '2.0-2.5cm', '2.5-3.0cm', '3cm以上'] },
    { title: '干湿度', list: ['2%以下', '2-5%', '5%以上'] },
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
  ],
  '金花菜': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '种植环境', list: ['露天', '温室'] },
    { title: '采摘季节', list: ['春季', '夏季', '秋季', '冬季'] },
    { title: '货品状态', list: ['干货', '鲜货'] },
  ],
  '蕨菜': [
    { title: '货品包装', list: ['散装', '真空包装'] },
    { title: '货品列表', list: ['鲜货', '干货'] },
  ],
  '救心菜': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '货品状态', list: ['带根', '不带根'] },
  ],
  '韭黄': [
    { title: '茬数', list: ['头茬', '二茬', '三茬'] },
    { title: '高度', list: ['20 - 30cm', '30 - 40公分', '40 - 50cm', '50 - 60cm', '60 - 70cm'] },
  ],
  '红葱头': [
    { title: '储存方法', list: ['窖藏', '冷库', '鲜货'] }
  ],
  '藠头': [
    { title: '外形大小', list: ['2公分以下', '2-3公分', '3公分以上', '4公分以上'] }
  ],
  '芥蓝': [
    { title: '直径', list: ['list1-2cm', '2-3cm', '3-4cm', '4-5cm', '5-7cm', '7-9cm', '9-12cm', '12cm以上'] },
    { title: '储藏方法', list: ['冷库', '鲜货'] },
    { title: '种植环境', list: ['露天种植', '大棚温室'] },
  ],
  '金丝绞瓜': [
    { title: '单个重', list: ['2-3斤', '3-4斤', '4-5斤', '5-6斤', '6斤以上'] }
  ],
  '茭白': [
    { title: '长度', list: ['10-15cm', '15-20cm', '20-25cm', '25-35cm'] },
    { title: '横径', list: ['3-5cm', '5cm以上'] },
    { title: '表皮', list: ['带壳', '去壳'] },
  ],
  '韭菜': [
    { title: '茬数', list: ['头茬', '二茬', '三茬'] },
    { title: '高度', list: ['20cm以下', '20-30cm以下', '30-35cm', '35-40cm', '40-45cm', '45-50cm', '50-55cm', '55-60cm', '60-65cm', '65-70cm', '70cm以上'] },
    { title: '新鲜度', list: ['新鲜无干尖', '较新鲜少量干尖', '不新鲜多干尖'] },
  ],
  '荠菜': [
    { title: '茎长', list: ['5cm以下', '5cm以上', '5-10cm', '10cm以上'] },
    { title: '货品状态', list: ['冻货', '鲜货'] },
  ],
  '芥菜': [
    { title: '单株重', list: ['1两以上', '2两以上', '3两以上', '4两以上', '5两以上'] },
    { title: '货品状态', list: ['鲜货', '冻货', '干货'] },
  ],
  '苦菊': [
    { title: '叶长', list: ['5-8cm', '8-10cm', '10-12cm', '12-15cm', '15-20cm', '20-25cm', '25-30cm', '30cm以上'] },
  ],
  '苦瓜': [
    { title: '单个重', list: ['2两以下', '2-4两', '4-6两', '6-8两', '8两以上'] },
    { title: '长度', list: ['18cm以下', '18-22cm', '22-25cm', '25cm以上'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] },
  ],
  '空心菜': [
    { title: '株高', list: ['5cm以下', '10-15cm', '15-20cm', '20-25cm', '25-30cm', '30-35cm', '35-40cm', '40-45cm'] },
    { title: '颜色', list: ['浅绿', '墨绿'] },
    { title: '农药残留', list: ['0.1 % ', '0.2 % ', '0.5 % ', '1 %'] },
    { title: '农药标准纯度', list: ['95, 96'] },
  ],
  '辣椒': [
    { title: '长度', list: ['2-5cm', '5-10cm', '10-15cm', '15-20cm', '20cm以上'] },
    { title: '辣度', list: ['特辣', '中辣', '微辣', '甜辣'] },
    { title: '颜色', list: ['红色', '彩色', '橙黄', '紫红', '青色', '黄色'] },
    { title: '货品包装', list: ['纸箱', '塑框', '泡沫箱', '编织袋'] },
    { title: '形状', list: ['矩园状', '卵形', '披针形'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] },
  ],
  '莲藕': [
    { title: '节长', list: ['5-10cm', '10-15cm', '15-20cm', '20-25cm', '25-30cm', '30-35cm', '35-40cm'] },
    { title: '直径', list: ['3-5cm', '5-7cm', '7-9cm', '9-11cm', '11-13cm', '13-15cm'] },
    { title: '货品等级', list: ['一级', '二级', '其他'] },
    { title: '货品类别', list: ['毛藕', '净藕'] },
    { title: '是否水洗', list: ['带泥藕', '水洗藕'] },
  ],
  '芦笋': [
    { title: '长度', list: ['12cm以上', '16xm以上', '20cm以上', '24cm以上', '28cm以上', '32cm以上'] },
    { title: '直径', list: ['5mm以上', '7mm以上', '10mm以上', '13mm以上', '16mm以上', '20mm以上'] }
  ],
  '菱角': [
    { title: '种植方式', list: ['野菱', '家菱'] },
    { title: '果型', list: ['四角', '两角'] },
    { title: '货品类别', list: ['老菱', '嫩菱'] },
  ]
  ,
  '萝卜': [
    { title: '单个重', list: ['0,list.2斤以下', '0.2-1斤', '1-1.5斤', '1.5-2斤', '2-2.5斤', '2.5-3斤', '3-3.5斤', '3.5-4斤', '4斤以上'] },
    { title: '长度', list: ['10cm以下', '10 - 15cm', '15 - 20cm', '20 - 25cm', '25cm以上'] },
    { title: '直径大小', list: ['3cm以下', '3cm以上', '5cm以上'] },
    { title: '是否水洗', list: ['水洗', '带泥'] },
    { title: '货品包装', list: ['箱装', '袋装', '薄膜袋'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] },
  ],
  '凉薯': [
    { title: '单个重', list: ['500g', '500-1000g', '1000-1500g', '1500-2000g', '2000-2500g', '2500g以上'] },
    { title: '货品形态', list: ['扁圆型', '扁球型', '纺锤形', '圆锥形'] }
  ],
  '萝卜菜': [
    { title: '叶长', list: ['5-8cm', '8-15cm', '15-20cm', '20cm以上'] },
    { title: '储存方式', list: ['冷库', '鲜货'] }
  ],
  '藜蒿': [
    { title: '杆长', list: ['5-10cm', '10-15cm', '15-20cm', '20-25cm', '25-30cm', '30-35cm', '35-40cm', '40-45cm', '45cm以上'] }
  ],
  '莲蓬': [
    { title: '货品等级', list: ['特级', '一级', '二级', '三级', '统货'] },
    { title: '直径', list: ['5cm以下', '5 - 8cm', '8cm以上'] },
    { title: '颜色', list: ['白莲', '红莲'] },
    { title: '货品包装', list: ['散装', '袋装', '箱装'] }
  ],
  '木耳': [
    { title: '货品等级', list: ['特级', '一级', '二级', '等外'] },
    { title: '耳片厚度', list: ['1mm以下', '1 - 1.5mm', '1.5mm以上'] },
    { title: '货品状态', list: ['干货', '鲜货'] },
    { title: '叶片大小', list: ['3cm²', '3 - 5cm²', '5 - 7cm²', '7cm²以上'] }
  ],
  '马兰头': [
    { title: '株高', list: ['5cm以下', '5-10cm', '10cm以上'] }
  ],
  '马齿笕': [
    { title: '货品类别', list: ['鲜货', '干货'] },
    { title: '用途', list: ['实用', '药用'] },
  ],
  '毛豆': [
    { title: '单个大小', list: ['6克以下', '6-12克', '12-18克', '18-24克', '24-30克'] }
  ],
  '魔芋': [
    { title: '货品类别', list: ['干魔芋', '鲜魔芋', '魔芋丝'] }
  ],
  '木薯': [
    { title: '货品类别', list: ['鲜货', '干货'] }
  ],
  '木耳菜': [
    { title: '颜色', list: ['绿色', '紫色'] },
    { title: '形状', list: ['倒卵形', '长圆状椭圆形', '长圆状披针形'] },
    { title: '种植环境', list: ['野生', '露地种植', '大棚种植'] }
  ],
  '牡丹吊兰': [
    { title: '货品包装', list: ['散装', '包装'] },
    { title: '株高', list: ['30cm以下', '40-60cm', '60cm以上'] }
  ],
  '牛肝菌': [
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
    { title: '虫蛀率', list: ['1.0%', '3.0%', '5.0%'] },
    { title: '杂质', list: ['1.0%', '5.0%'] },
  ],
  '南瓜藤': [
    { title: '货品类别', list: ['新,list鲜', '干货'] },
    { title: '货品状态', list: ['带叶', '不带叶 '] }
  ],
  '南瓜': [
    { title: '单个重', list: ['0.4斤以下', '0.4-0.6斤', '0.5-0.7斤', '0.7-1.0斤', '1-2斤', '2-4斤', '4-6斤', '6-10斤', '10-15斤', '15斤以上'] },
    { title: '形状', list: ['扁圆形', '长条形', '其他'] },
    { title: '储藏方法', list: ['鲜货', '窖藏', '冷库'] },
    { title: '表面厚度', list: ['皮薄', '皮厚'] },
    { title: '货品等级', list: ['特级', '一级', '二级', '通货'] },
    { title: '外皮颜色', list: ['黄色', '红色', '黑色', '金色', '青色'] }
  ],
  '平菇': [
    { title: '菌柄长度', list: ['3-5cm', '5-7cm', '7-9cm', '9cm'] },
    { title: '颜色', list: ['乳白色', '浅灰色', '黑色'] },
    { title: '菌盖厚度', list: ['厚', '薄'] },
    { title: '菌盖直径', list: ['3cm', '5 - 8cm', '8 - 10cm', '10 - 15cm', '15cm'] },
    { title: '菌柄粗度', list: ['1.5cm', '2.0厘cm', '2.5cm', '3.0cm'] }
  ],
  '苤蓝': [
    { title: '单个重', list: ['2两以上', '3两以上', '4两以上', '5两以上', '6两以上', '7两以上', '1斤以上'] },
    { title: '表皮颜色', list: ['绿色', '紫色'] }
  ],
  '藕带': [
    { title: '长度', list: ['10cm以下', '10-20cm', '20-30cm', '30-50cm', '50cm以下'] }
  ],
  '茄子': [
    { title: '单个重', list: ['2两以上', '3两以上', '4两以上', '5两以上'] },
    { title: '形状', list: ['长茄', '圆茄'] },
    { title: '颜色', list: ['紫色', '青色'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] }
  ],
  '秋葵': [
    { title: '长度', list: ['3-6cm', '6-8cm', '8-10cm', '10-12cm', '12-15cm', '15cm以上'] },
    { title: '货品包装', list: ['塑框', '泡沫箱'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] },
  ],
  '芹菜': [
    { title: '杆长', list: ['40cm以下', '40-45cm', '45-50cm', '50-55cm', '55-60cm', '60cm以上'] },
    { title: '单棵重', list: ['0.5斤以下', '0.5 - 1.0斤', '1.0 - 1.5斤', '1.5 - 2.0斤', '2.0 - 2.5斤', '2.5 - 3.0斤', '3.0斤以上'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] }
  ],
  '松树菌': [
    { title: '货品状态', list: ['干货', '鲜货', '冻货'] },
    { title: '货品等级', list: ['特级', '一级', '二级', '三级', '等外'] }
  ],
  '松茸': [
    { title: '菌柄长度', list: ['5cm左右', '8cm左右', '11cm左右', '14cm左右'] },
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
    { title: '菌盖直径', list: ['3 - 5cm', '5 - 8cm', '10cm左右', '15cm左右', '20cm左右'] },
    { title: '菌柄粗度', list: ['1.5cm以下', '1.5 - 2.0cm', '2.0 - 2.5cm', '2.5cm以上'] },
    { title: '货品等级', list: ['鲜货', '干货', '冻货'] }
  ],
  '山野菜': [
    { title: '货品状态', list: ['干货', '鲜货'] },
    { title: '货品等级', list: ['特级', '一级', '二级', '三级', '等外'] }
  ],
  '珊瑚菜': [
    { title: '长度', list: ['10cm以上', '12cm以上', '15cm以上', '20cm以上', '25cm以上', '30cm以上', '35cm以上'] },
    { title: '是否打冷', list: ['打冷', '不打冷'] },
    { title: '种植环境', list: ['大棚种植', '露地种植'] },
    { title: '品相', list: ['新鲜发绿', '无斑点'] }
  ],
  '四棱豆': [
    { title: '长度', list: ['5cm以上', '6cm以上', '7cm以上', '8cm以上', '9cm以上', '10cm以上', '12cm以上'] },
    { title: '货品包装', list: ['塑框', '泡沫箱'] }
  ],
  '蒜苗': [
    { title: '长度', list: ['40cm以下', '40-45cm', '45-50cm', '50-60cm', '70-80cm', '80-90cm'] },
    { title: '根部颜色', list: ['红根', '白根'] }
  ],
  '生姜': [
    { title: '单个重', list: ['1两以下', '2两以上', '3两以上', '4两以上', '5两以上', '6两以上', '7两以上', '8两以上', '9两以上'] },
    { title: '是否水洗', list: ['水洗', '带土m'] },
    { title: '货品等级', list: ['特级。一级', '二级', '三级'] },
    { title: '储藏方法', list: ['窖藏', '冷库', '鲜货'] },
  ],
  '蒜苔': [
    { title: '茬数', list: ['一茬', '二茬', '三茬'] },
    { title: '货品等级', list: ['精品', '通货', '次货'] },
    { title: '长度', list: ['30cm以下', '30 - 40cm', '40 - 50cm', '50 - 60cm', '60 - 70cm', '70cm以上'] },
    { title: '色泽', list: ['鲜绿', '淡绿'] }
  ],
  '丝瓜': [
    { title: '长度', list: ['20cm以上', '25cm以上', '30cm以上', '35cm以上', '40cm以上', '45cm以上', '50cm以上', '55cm以上', '60cm以上', '65cm以上', '70cm以上'] },
    { title: '直径', list: ['2cm以上', '3cm以上', '4cm以上', '5cm以上', '6cm以上'] }
  ],
  '山药': [
    { title: '长度', list: ['20-30cm', '30-40cm', '40-50cm', '50-70cm', '70-90cm', '90cm以上'] },
    { title: '直径', list: ['1 - 2cm', '2 - 3cm', '3 - 4cm', '4 - 6cm', '6 - 8cm', '8cm以上'] },
    { title: '货品等级', list: ['特级', '一级', '二级'] },
    { title: '储存方式', list: ['窖藏', '冷库', '鲜货'] }
  ],
  '生菜': [
    { title: '单株重', list: ['1-2两', '2-3两', '3-4两', '4-5两', '5-6两', '6-7两', '7-8两', '8-9两', '1斤以上'] },
    { title: '颜色', list: ['绿生菜', '紫生菜'] },
    { title: '叶型', list: ['皱叶', '结球', '直叶'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] }
  ],
  '土豆': [
    { title: '单颗重', list: ['1两以下', '1两以上', '1-2两', '2两以上', '1-3两', '2-4两', '3两以上', '4两以上', '5两以上', '统货'] },
    { title: '货品包装', list: ['纸箱', '编织袋', '定制包装'] },
    { title: '储存方式', list: ['鲜货', '窖藏', '冷库'] },
    { title: '青头有无', list: ['无青头', '有青头'] },
    { title: '土豆心颜色', list: ['白色', '黄色', '紫色', '黑色', '红色'] }
  ],
  '甜菜': [
    { title: '株高', list: ['15cm以上', '15-20cm', '20-25cm', '25-30cm', '30-40cm', '40cm以上'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] }
  ],
  '茼蒿': [
    { title: '杆长', list: ['5cm以下', '5-10cm', '10-15cm', '15-20cm', '20-25cm', '25-30cm', '30-35cm', '35-40cm', '40-45cm', '45cm以上'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] }
  ],
  '豌豆': [
    { title: '荚长', list: ['5-7cm', '7-10cm', '10-12cm', '12-14cm'] },
    { title: '饱满度', list: ['较饱满', '饱满', '未饱满'] }
  ],
  '娃娃菜': [
    { title: '单个重', list: ['2-3两以上', '3-4两以上', '4-5两以上', '5-7两以上', '7-10两以上', '10两以上'] },
    { title: '品级', list: ['一级', '二级', '三级', '等外'] },
    { title: '种植环境', list: ['露地种植', '大棚种植'] }
  ],
  '莴笋': [
    { title: '单颗重', list: ['0.3-0.5斤', '0.5-0.8斤', '0.8-1.0斤', '1.0-1.5斤', '1.5-2.0斤', '2斤以上'] },
    { title: '长度', list: ['12cm以下', '12 - 16cm', '16 - 20cm', '20 - 24cm', '24 - 28cm', '28 - 40cm', '40 - 50cm', '50 - 60cm', '60 - 70cm', '70cm以上'] },
    { title: '粗度', list: ['2.5cm以下', '2.5 - 3.5cm', '3.5 - 4.5cm', '4.5 - 5.5cm', '5.5 - 6.5cm', '6.5cm以上'] },
    { title: '表皮厚度', list: ['皮薄', '皮厚'] },
    { title: '种植环境', list: ['大棚种植', '露地种植'] }
  ],
  '香菇': [
    { title: '货品等级', list: ['特级', '一级', '二级', '三级', '混级统货'] },
    { title: '菌盖直径', list: ['1.0 - 1.8cm', '1.8 - 2.5cm, 2.5 - 3.0cm, 3.0 - 3.5cm, 3.5 - 4.0cm, 4.0 - 4.5cm, 4.5 - 5.0cm, 5.0 - 6.0cm, 6.0cm以上'] },
    { title: '水分含量≤', list: ['1 % ', '35 % ', '85 % ', '86 % ', '87 % ', '88 % ', '89 % ', '90 %'] },
    { title: '货品类别', list: ['椴木菇', '春栽菇', '秋栽菇', '工厂大棚菇', '地栽菇', '水菇'] },
  ],
  '杏鲍菇': [
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
    { title: '杂质含量', list: ['0.8 % ', '1 % ', '1.2 %'] },
    { title: '菌盖直径', list: ['3cm左右', '4cm左右'] },
    { title: '菌盖厚度', list: ['0.8cm, 1.0cm, 1.2cm'] },
    { title: '残缺菇', list: ['1 % ', '2 % ', '3 %, 5 %, 10 % '] },
    { title: '水分', list: ['1 % ', '35 % ', '60 % ', '70 % ', '85 % ', '86 % ', '87 % ', '88 %, 89 %, 80 %'] },
  ],
  '鲜百合': [
    { title: '花头数', list: ['单,list头', '双头', '三天', '四头', '大包', '小包'] },
    { title: '花头长度', list: ['10 - 15cm', '15 - 18cm', '20 - 40cm', '40 - 60cm', '60 - 80cm', '80cm以上'] }
  ],
  '香茅草': [
    { title: '杆长', list: ['30-50cm', '50-60cm', '60-80cm', '80-90cm', '90cm以上'] }
  ],
  '象牙菜': [
    { title: '货品包装', list: ['散装', '普通包装', '真空包装'] },
    { title: '货品等级', list: ['统货', '一级', '二级'] },
  ],
  '小葱': [
    { title: '长度', list: ['10-15cm', '15-20cm', '20-25cm', '25-35cm', '35-40cm', '40-45cm', '45-50cm', '50-55cm ', '55-60cm', '60-70cm', '70-80cm', '80cm以上'] }
  ],
  '西红柿': [
    { title: '货品状态', list: ['硬粉', '大红', '黛粉', '硬黄', '软粉'] },
    { title: '货品果径状态', list: ['弧一以下', '弧二以下', '弧三以下', '通货'] },
    { title: '是否打冷', list: ['打冷', '不打冷'] },
    { title: '货品包装', list: ['纸箱', '塑框', '泡沫箱'] },
    { title: '种植环境', list: ['无土栽培', '大棚果', '露地果'] },
  ],
  '香椿芽': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '货品等级', list: ['统货', '一级', '二级', '残次品'] },
    { title: '生长环境', list: ['露天种植', '大棚种植'] }
  ],
  '西兰花': [
    { title: '单个重', list: ['0.5-0.8斤', '0.8-1.2斤', '1.2-1.5斤', '1.5-2.0斤', '2.0-2.5斤', '2.5斤以上'] },
    { title: '直径', list: ['10cm以下', '10 - 15cm', '15 - 20cm', '20 - 25cm', '25cm以上'] },
    { title: '货品包装', list: ['袋装', '箱装', '散装'] },
    { title: '花粒', list: ['有少量黄粒', '有少量红粒', '纯绿'] },
    { title: '种植环境', list: ['大棚种植', '露天种植'] },
  ],
  '西葫芦': [
    { title: '单个重', list: ['0.4斤以上', '0.4-0.6斤', '0.6-0.8斤', '0.8-1斤', '1斤以上'] },
    { title: '货品包装', list: ['纸箱', '泡沫箱'] }
  ],
  '小白菜': [
    { title: '长度', list: ['8公分以下', '8-10公分', '10-15公分', '15-20公分', '20-25公分', '25-30公分', '30公分以上'] },
    { title: '颜色', list: ['浅绿色', '深绿色'] },
    { title: '种植环境', list: ['大棚种植', '无土栽培', '露地栽培'] }
  ],
  '苋菜': [
    { title: '长度', list: ['10-15cm', '15-20cm', '20-25cm', '25-30cm', '30-40cm', '40cm以上'] },
    { title: '颜色', list: ['紫红', '鲜绿'] },
    { title: '种植环境', list: ['大棚种植', '露天直播', '无土栽培'] },
  ],
  '香菜': [
    { title: '杆长', list: ['10cm以下', '10-15cm', '15-20cm', '20-25cm', '25-30cm', '30-35cm', '35cm以上'] },
    { title: '货品等级', list: ['特级', '一级', '二级', '等外'] },
    { title: '种植环境', list: ['露地种植', '大棚温室种植'] }
  ],
  '鲜玉米': [
    { title: '货品状态', list: ['鲜货', '冻货'] },
    { title: '杂质含量', list: ['1 % ', '2 % ', '3 % ', '5 % ', '10 % ', '50 %'] },
    { title: '品种属性', list: ['非转基因', '转基因'] },
  ],
  '银耳': [
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] }
  ],
  '鱼腥草': [
    { title: '货品包装', list: ['塑料袋', '纸盒', 'PE薄膜', '包装袋'] },
    { title: '储存方法', list: ['冷藏', '低温', '干燥', '常温', '阴凉处'] }
  ],
  '洋合笋': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '货品状态', list: ['带泥', '不带泥'] }
  ],
  '洋葱': [
    { title: '单个直径', list: ['3-8cm', '4-8cm', '5-8cm', '6-8cm', '8cm以上'] },
    { title: '单个重', list: ['2 - 2.5两, 2.5 - 3两', '3 - 3.5两', '3.5 - 4两', '4两以上'] },
    { title: '表皮颜色', list: ['黄皮', '紫皮', '红皮', '白皮', '二红'] },
    { title: '储藏方法', list: ['窖藏', '冷库', '鲜货'] }
  ],
  '芽苗菜': [
    { title: '货品包装', list: ['盒装', '散装', '袋装', '箱装'] },
    { title: '种植环境', list: ['露天', '温室'] },
    { title: '长度', list: ['5cm以下', '5 - 10cm', '10 - 15cm', '15 - 20cm', '20cm以上'] }
  ],
  '芋芽': [
    { title: '货品包装', list: ['散装', '袋装', '箱装'] },
    { title: '长度', list: ['5cm以下', '5 - 10cm', '10 - 15cm', '15 - 20cm', '20cm以上'] }
  ],
  '芋头': [
    { title: '单个直径', list: ['1cm以上', '2cm以上', '3cm以上', '4cm以上', '5cm以上', '6cm以上'] },
    { title: '单个重', list: ['30g以下', '30g以上', '50g以上', '100g以上', '150g以上', '200g以上', '250g以上', '500g以上', '1000g以上', '1500g以上'] },
    { title: '货品包装', list: ['网装', '纸箱', '编织袋'] },
    { title: '储存方式', list: ['窖藏货', '冷库货', '鲜货'] }
  ],
  '油麦菜': [
    { title: '杆长', list: ['10-15cm以上', '15-20cm以上', '20-25cm以上', '25-30cm以上', '30-35cm以上', '35-40cm'] },
    { title: '种植环境', list: ['大棚温室种植', '露天种植'] },
    { title: '颜色', list: ['浅绿色', '深绿色'] }
  ],
  '油菜': [
    { title: '单颗重', list: ['1两以下', '1-2两', '2-3两', '3-4两', '4-5两', '5两以上'] },
    { title: '货品等级', list: ['一级', '二级', '等外'] },
    { title: '种植环境', list: ['大棚温室种植', '露天种植 '] },
    { title: '货品状态', list: ['带泥', '不带泥'] }
  ],
  '竹荪': [
    { title: '货品等级', list: ['特级', '一级', '二级', '三级'] },
    { title: '杂质', list: ['0.1 % ', '0.2 % ', '0.3 % ', '0.5 % ', '1.0 %'] },
    { title: '水分', list: ['0.0 % ', '0.1 % ', '85.0 % ', '86.0 % ', '87.0 % ', '88.0 %, 89.0 %, 90.0 %'] },
    { title: '货品状态', list: ['鲜货', '干货'] }
  ],
  '紫背天葵': [
    { title: '叶长', list: ['3cm以上', '12cm以上', '15cm以上'] }
  ],
  '紫苏': [
    { title: '货品类别', list: ['鲜货', '干货'] }
  ],
  '紫薯': [
    { title: '单个重', list: ['2两以下', '3两以下', '3-4两', '4-5两', '5-6两', '6-7两', '8两以上'] },
    { title: '货品包装', list: ['纸箱', '编织袋'] },
    { title: '储存方式', list: ['窖藏', '冷库', '鲜货'] }
  ],
};








































































































































































































