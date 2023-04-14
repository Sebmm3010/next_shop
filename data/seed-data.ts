import bcrypt from "bcrypt";

interface SeedProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ValidTypes;
  gender: "hombre" | "mujer" | "infantil" | "unisex";
}
interface SeedUsers {
  name: string;
  email: string;
  password: string;
  role: "admin" | "client";
}

type ValidSizes =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "XXXL"
  | "30"
  | "33"
  | "35"
  | "36"
  | "37"
  | "40"
  | "43";
type ValidTypes =
  | "camisa"
  | "pantalon"
  | "chaqueta"
  | "sombrero"
  | "zapatos"
  | "vestido";

interface SeedData {
  users: SeedUsers[];
  products: SeedProduct[];
}

export const initialData: SeedData = {
  users: [
    {
      name: "Sebastian madero",
      email: "sebastian@gmail.com",
      password: bcrypt.hashSync("123456", 6),
      role: "admin",
    },
    {
      name: "Juan perez",
      email: "juan@gmail.com",
      password: bcrypt.hashSync("123456", 6),
      role: "client",
    },
  ],
  products: [
    {
      description:
        "Esta sudadera de manga larga es la prenda perfecta para añadir un toque de color a tu armario. Confeccionada en suave algodón de alta calidad, esta sudadera es cómoda y resistente para el uso diario. El color rojo vibrante es llamativo y atractivo, lo que la convierte en una prenda ideal para cualquier ocasión casual permitiendole estar a lo ultimo de la moda.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681486549/nextShop/cbpspevuyez0eeynqq4w.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681486549/nextShop/ikzyls9swjvatvruvtgq.jpg",
      ],
      inStock: 7,
      price: 50000,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "sudadera_manga_larga_hombre",
      type: "camisa",
      tags: ["manga_larga", "camisa"],
      title: "Sudadera manga larga para hombre",
      gender: "hombre",
    },
    {
      description:
        "Confeccionada en cuero genuino de alta calidad, esta chaqueta es resistente y duradera para el uso diario. El color negro clásico es atemporal y combina con cualquier estilo personal. El diseño de la chaqueta es elegante y moderno, con un cuello tipo solapa y un cierre frontal de cremallera. Tiene cuatro bolsillos exteriores con cierre de botón, y un bolsillo interior para mayor funcionalidad.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487333/nextShop/qskxgl3ob9ra47ldvyin.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487333/nextShop/uvz6ji94ejhgskmhe1q8.jpg",
      ],
      inStock: 5,
      price: 100000,
      sizes: ["XS", "S", "M", "XL", "XXL"],
      slug: "chaqueta_cuero_negro",
      type: "chaqueta",
      tags: ["chaqueta", "camisa"],
      title: "Chaqueta de cuero color negro",
      gender: "hombre",
    },

    {
      description:
        "El diseño de la chaqueta es moderno y versátil, con un corte recto y un cuello tipo solapa. Tiene un cierre frontal de botones y dos bolsillos exteriores con solapa, lo que la hace ideal para cualquier ocasión casual o elegante. La chaqueta tiene un ajuste ceñido que realza la figura, lo que la hace aún más elegante y sofisticada. Además, es fácil de combinar con pantalones, faldas o vestidos, lo que la convierte en una prenda versátil que se adapta a cualquier estilo personal.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487582/nextShop/puv8okvxnlkx2toedxlk.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487581/nextShop/uyxyirspxtnlubbo37hj.jpg",
      ],
      inStock: 10,
      price: 90000,
      sizes: ["S", "M", "L", "XL", "XXL"],
      slug: "chaqueta_color_beige_hombre",
      type: "chaqueta",
      tags: ["chaqueta", "camisa"],
      title: "Chaqueta color beige para hombre",
      gender: "hombre",
    },

    {
      description:
        "Esta camisa es la prenda perfecta para añadir elegancia y comodidad a cualquier atuendo. Confeccionada en suave algodón de alta calidad, esta camisa es cómoda y resistente para el uso diario. Tiene un corte recto y un cuello clásico, lo que la hace ideal para cualquier ocasión casual o formal. El diseño de la camisa es sencillo y elegante, con un cierre frontal de botones y un bolsillo en el pecho. El tejido es transpirable y ligero, lo que significa que se puede usar cómodamente durante todo el día y en cualquier época del año. Esta camisa es fácil de combinar con pantalones o jeans, lo que la convierte en una prenda versátil que se adapta a cualquier estilo personal.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487755/nextShop/jlbkjnojuc9tyhpk1v7r.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487754/nextShop/cra6jcoakhbmh5mmd5oy.jpg",
      ],
      inStock: 50,
      price: 45000,
      sizes: ["XS", "S", "M", "L"],
      slug: "camisa_estilo_playero",
      type: "camisa",
      tags: ["camisa", "colores"],
      title: "Camisa estilo playero",
      gender: "hombre",
    },
    {
      description:
        "Estos jeans negros para hombre son el complemento perfecto para cualquier guardarropa. Confeccionados en una tela de alta calidad, son suaves y cómodos al tacto. El corte ajustado los hace ideales para destacar la silueta masculina, y su diseño clásico y atemporal los hace fáciles de combinar con cualquier tipo de camisa, chaqueta o calzado. Además, su color negro profundo los hace ideales para cualquier ocasión, ya sea para un look casual de fin de semana o para un evento más formal. Con detalles de costura de alta calidad y acabados en metal negro, estos jeans no solo son elegantes, sino también duraderos y resistentes al desgaste. No esperes más y añade estos jeans negros a tu armario hoy mismo.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487814/nextShop/uazpjfp4xzjls0tbnmcn.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487814/nextShop/c640o1fy5yamyqsjbgdx.jpg",
      ],
      inStock: 50,
      price: 30500,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "jeans_negro_hombre",
      type: "pantalon",
      tags: ["jeans", "pantalon"],
      title: "Jeans color negro para hombre",
      gender: "hombre",
    },
    {
      description:
        "Camisa con un diseño simple y reconfortante, que puede ir en conjunto con cualquier prenda o conjunto. Exelente eleccion para una cena o para salir de fiesta.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487884/nextShop/a68lyozuxuakq5wf6xwb.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681487883/nextShop/ytwcw7nmwjkhowlhqa1k.jpg",
      ],
      inStock: 0,
      price: 35000,
      sizes: ["M", "L", "XL", "XXL"],
      slug: "camisa_blanco_hombre",
      type: "camisa",
      tags: ["camisa"],
      title: "Camisa color blanco para hombre",
      gender: "hombre",
    },
    {
      description:
        "Estos zapatos de vestir en color café oscuro son una excelente opción para hombres que buscan un calzado elegante y sofisticado. El diseño clásico y atemporal, junto con la alta calidad de los materiales utilizados, garantizan una apariencia elegante y una durabilidad a largo plazo. Confeccionados en piel de primera calidad, estos zapatos ofrecen una sensación cómoda y suave al caminar.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488013/nextShop/sq5b2ytdthk6hvspukrl.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488013/nextShop/wzis4icvmvv2ncnioynb.jpg",
      ],
      inStock: 15,
      price: 95000,
      sizes: ["30", "35", "40", "43"],
      slug: "zapatos_cafe_hombre",
      type: "zapatos",
      tags: ["zapatos", "cafe", "tacon"],
      title: "Zapatos cafes de tacon alto para hombre",
      gender: "hombre",
    },
    {
      description:
        "Esta camisa de la marca Crown es una prenda elegante y versátil para cualquier ocasión. Confeccionada con materiales de alta calidad, esta camisa ofrece una sensación suave y cómoda al contacto con la piel. El diseño clásico de la camisa de botones se combina con detalles modernos y sofisticados, como el corte ajustado y la tela con textura. La paleta de colores es variada, lo que permite elegir la opción que mejor se adapte a tu estilo personal y tus necesidades.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488074/nextShop/mtg26p9ktnt39v7w4cgk.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488074/nextShop/mzezeqpxqdv8ndtuls9v.jpg",
      ],
      inStock: 17,
      price: 50000,
      sizes: ["XS", "S", "XL", "XXL"],
      slug: "camisa_negra_crown",
      type: "camisa",
      tags: ["camisa"],
      title: "Camisa negra marca Crown",
      gender: "hombre",
    },
    {
      description:
        "Estos zapatos Nike en color verde son perfectos para quienes buscan un calzado deportivo y con estilo. Confeccionados con materiales de alta calidad, estos zapatos ofrecen una gran durabilidad y una sensación cómoda al caminar o entrenar. El diseño moderno y sofisticado se combina con detalles clásicos de Nike, como el icónico logotipo de la marca en la parte lateral de los zapatos.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488129/nextShop/r0ntegixmosbbdeqmiyp.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488128/nextShop/hkrvu9aatdcql7raknfk.jpg",
      ],
      inStock: 12,
      price: 80500,
      sizes: ["30", "35", "40"],
      slug: "zapatos_nike_verde",
      type: "zapatos",
      tags: ["zapatos", "deporte", "nike"],
      title: "Zapatos nike color verde",
      gender: "unisex",
    },
    {
      description:
        "Esta camisa deportiva de manga larga en color blanco es la opción ideal para cualquier actividad deportiva. Confeccionada con materiales de alta calidad, esta camisa ofrece una sensación suave y cómoda al contacto con la piel. El diseño de manga larga ofrece una mayor protección contra los rayos UV y el sudor, manteniéndote fresco y seco durante tus entrenamientos.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488174/nextShop/al1mmkb9uwectftxvjk1.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488174/nextShop/hokz4cnbmo0zwrccrllx.jpg",
      ],
      inStock: 5,
      price: 30500,
      sizes: ["XS", "S"],
      slug: "camisa_deportiva_manga_larga",
      type: "camisa",
      tags: ["camisa", "manga_larga", "deporte"],
      title: "Camisa deportiva blanca manga larga",
      gender: "hombre",
    },
    {
      description:
        "Estos zapatos Converse negros de mujer son un clásico atemporal para cualquier guardarropa. Confeccionados con materiales de alta calidad, estos zapatos ofrecen una gran durabilidad y una sensación cómoda al caminar. El diseño icónico de los Converse se combina con detalles modernos, como una suela de goma antideslizante y una plantilla acolchada para brindar una mayor comodidad y soporte al pie.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488255/nextShop/ca5uwlp5nbb4j5qarkmo.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488255/nextShop/yy3jvg26xrplqzfeltju.jpg",
      ],
      inStock: 2,
      price: 50000,
      sizes: ["30", "35", "36"],
      slug: "zapatos_negros_convers",
      type: "zapatos",
      tags: ["zapatos", "convers"],
      title: "Zapatos negros marca convers",
      gender: "mujer",
    },
    {
      description:
        "Esta camisa tipo polo en color azul es la opción perfecta para cualquier ocasión casual. Confeccionada con materiales de alta calidad, esta camisa ofrece una sensación suave y cómoda al contacto con la piel. El diseño clásico tipo polo cuenta con un cuello con solapa y botones, así como con mangas cortas, lo que lo hace ideal para un look informal y fresco. El color azul vibrante es llamativo y atractivo a la vista, lo que lo hace fácil de combinar con pantalones o shorts de diferentes colores y estilos.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488386/nextShop/wz2lqzkngr9ihomz81gz.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488385/nextShop/u0yzcv2dq0cjcqaxwasl.jpg",
      ],
      inStock: 82,
      price: 45000,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "camisa_polo_azul",
      type: "camisa",
      tags: ["camisa", "polo"],
      title: "Camisa tipo polo en color azul",
      gender: "hombre",
    },
    {
      description:
        "¡Revive los buenos tiempos con nuestra camisa retro de Pac-Man! Confeccionada en algodón suave y transpirable, esta camiseta es perfecta para llevar en cualquier ocasión casual. La camisa está disponible en tallas desde XS hasta XXL, por lo que podrás encontrar la talla perfecta para ti. Además, la impresión de alta calidad garantiza que la imagen no se desvanezca ni se agriete después de múltiples lavados.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488323/nextShop/eokzyp975qx9bxscgl2o.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488324/nextShop/ztxcefh1ddkfoaycjail.jpg",
      ],
      inStock: 24,
      price: 50000,
      sizes: ["XL", "XXL"],
      slug: "camisa_pac_man",
      type: "camisa",
      tags: ["camisa", "pac-man", "games", "pacman"],
      title: "Camisa de pac-man",
      gender: "hombre",
    },
    {
      description:
        "Explora la naturaleza con nuestras botas de senderismo premium, diseñadas para brindarte la mejor experiencia de caminata. Confeccionadas con materiales de alta calidad, estas botas son resistentes y duraderas, perfectas para caminatas en cualquier terreno. La parte superior está hecha de cuero resistente al agua y malla transpirable, lo que te brinda protección contra los elementos y a la vez mantiene tus pies frescos y secos.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488461/nextShop/pm4q4huocp9jebvoef2s.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488460/nextShop/w8rhcdahdbtw1g0lljpu.jpg",
      ],
      inStock: 5,
      price: 80000,
      sizes: ["30", "35", "40", "43"],
      slug: "botas_senderismo",
      type: "zapatos",
      tags: ["zapato", "botas", "bota"],
      title: "Botas de senderismo",
      gender: "unisex",
    },
    {
      description:
        "¡Protege tu piel de los rayos del sol y luce con estilo en la playa con nuestro sombrero de playa azul! Este sombrero de ala ancha es perfecto para protegerte del sol y mantener tu cabeza fresca durante los días más calurosos del verano.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488504/nextShop/uqjrfc5ke4iyymekply6.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488504/nextShop/rzvbzn43z8maeigtbcqc.jpg",
      ],
      inStock: 150,
      price: 30000,
      sizes: ["S", "M", "L"],
      slug: "sombrero_playa",
      type: "sombrero",
      tags: ["sombrero", "playa"],
      title: "Sombrero de playa",
      gender: "mujer",
    },
    {
      description:
        "Nuestro sombrero vueltiao es un ícono de la cultura colombiana, elaborado a mano por artesanos locales utilizando la técnica tradicional de tejido de caña flecha. Este sombrero es perfecto para aquellos que quieren agregar un toque de autenticidad a su estilo.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488797/nextShop/jtug8pha0rpwlnwuimqx.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488796/nextShop/txbnagh2av0eznw6hlnf.jpg",
      ],
      inStock: 10,
      price: 10000,
      sizes: ["XS", "S", "M", "L"],
      slug: "sombrero_vueltiaoe",
      type: "sombrero",
      tags: ["sombrero", "colombia", "vueltiao"],
      title: "Sombrero vueltiao",
      gender: "unisex",
    },
    {
      description:
        "¡Deslumbra con estos elegantes tacones rosas con moños! El color rosa vibrante y el detalle del moño los hacen perfectos para cualquier ocasión especial, desde bodas hasta fiestas de graduación.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488840/nextShop/jb87jgwpkwpekmq8wait.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681488840/nextShop/yc4hyaku6un9ldfahyli.jpg",
      ],
      inStock: 34,
      price: 120000,
      sizes: ["30", "33", "35", "36"],
      slug: "tacones_rosas_moño",
      type: "zapatos",
      tags: ["zapato", "tacones"],
      title: "Tacones rosas con moños",
      gender: "mujer",
    },
    {
      description:
        "¡Demuestra tu espíritu deportivo con nuestra camisa deportiva marca Spartans! Esta camisa es perfecta para cualquier actividad deportiva, desde entrenamientos hasta competiciones. La camisa está hecha de tela de alta calidad que es transpirable y ligera, lo que la hace ideal para deportes de alta intensidad. La tela también es resistente y duradera, por lo que puede soportar el desgaste y el lavado repetido sin perder su forma o color.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490114/nextShop/xyprv4u1ddwjw8scsj19.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490114/nextShop/uk6gqrx2whlpszaxya9h.jpg",
      ],
      inStock: 15,
      price: 40000,
      sizes: ["S", "XL", "XXL"],
      slug: "camisa_deportiva_spartans",
      type: "camisa",
      tags: ["camisa", "deporte"],
      title: "Camisa deportiva spartans 1.0",
      gender: "hombre",
    },
    {
      description:
        "La gorra está hecha de tela de alta calidad que es resistente y duradera, lo que significa que puede soportar el desgaste y el lavado repetido sin perder su forma o color. La tela también es transpirable y cómoda de usar, lo que la hace ideal para usar durante largos períodos de tiempo.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490156/nextShop/unulypbxftbcgwk5wmze.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490155/nextShop/jsra6wdvmvquok2wngcl.jpg",
      ],
      inStock: 12,
      price: 50000,
      sizes: ["XS", "S", "M"],
      slug: "gorra_negra_ny",
      type: "sombrero",
      tags: ["sombrero", "gorra", "ny"],
      title: "Gorra negra NY",
      gender: "unisex",
    },
    {
      description:
        "¡Mantén tu cabeza y tus oídos calientes durante el invierno con nuestro sombrero de invierno! Este sombrero es perfecto para cualquier actividad al aire libre durante los meses de invierno, desde caminatas en la nieve hasta deportes de invierno.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490258/nextShop/hsdo44jutmad8smfk9ro.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490259/nextShop/nnk07xojjlpcaskw0yop.jpg",
      ],
      inStock: 10,
      price: 50000,
      sizes: ["XS", "S", "M", "L", "XL"],
      slug: "sombrero_acolchado_invierno",
      type: "sombrero",
      tags: ["sombrero", "invierno", "acolchado"],
      title: "Sombrero acolchado para invierno",
      gender: "mujer",
    },
    {
      description:
        "¡Muestra tu amor por la saga de Star Wars con nuestro hoodie oficial de Star Wars! Este hoodie es perfecto para cualquier fanático de la franquicia, desde los más jóvenes hasta los más experimentados. El hoodie está hecho de una mezcla suave de algodón y poliéster, lo que lo hace cómodo y duradero. El diseño del hoodie presenta el icónico logo de Star Wars en la parte delantera y un diseño detallado en la parte trasera, que incluye personajes populares como Darth Vader, Luke Skywalker y la Princesa Leia.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490309/nextShop/nw2eecthguhyoucnzm7f.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490308/nextShop/iylneqxhxgmhr5oy33wa.jpg",
      ],
      inStock: 10,
      price: 130000,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "hoodie_star_wars",
      type: "chaqueta",
      tags: ["hoodie", "chaqueta", "capucha", "star-wars"],
      title: "Hoodie de star-wars",
      gender: "unisex",
    },
    {
      description:
        "Mantén el calor y la comodidad con nuestro chaleco afelpado negro. Este chaleco es perfecto para aquellos que buscan una prenda de vestir cálida y elegante para los días fríos de invierno. El chaleco está hecho de un material afelpado suave y cálido que se siente suave y cómodo contra la piel. El forro interno del chaleco es también de alta calidad para mantener el calor en su interior.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490354/nextShop/wp7w01hmvbs9lidcblyh.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490354/nextShop/db7z9i5wtnezcmirpvoo.jpg",
      ],
      inStock: 100,
      price: 100000,
      sizes: ["XS", "L", "XL", "XXL"],
      slug: "chaleco_afelpado",
      type: "chaqueta",
      tags: ["chaqueta", "hoodie", "peluda"],
      title: "Chaleco afelpado negro",
      gender: "mujer",
    },
    {
      description:
        "Añade un toque elegante y exótico a tu guardarropa con nuestra chaqueta estilo oriental. Inspirada en la moda asiática, esta chaqueta es perfecta para aquellos que buscan una prenda de vestir única y llamativa. La chaqueta está hecha de una mezcla de seda y algodón, lo que le da un acabado suave y lujoso. El diseño oriental presenta detalles exquisitos como bordados, botones dorados y un corte elegante y ajustado.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490433/nextShop/huwvniuz0nwbwmn8e6bi.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490432/nextShop/pqyfdmvxxg90zvswxibp.jpg",
      ],
      inStock: 7,
      price: 85000,
      sizes: ["XS", "S", "M"],
      slug: "chaquta_estilo_oriental",
      type: "chaqueta",
      tags: ["camisa", "china", "oriental"],
      title: "Chaqueta estilo oriental",
      gender: "mujer",
    },
    {
      description:
        "Haz una declaración audaz con nuestra chaqueta multicolor marca iRealistic. Esta chaqueta única es perfecta para aquellos que buscan una prenda de vestir llamativa y moderna que realmente destaque. El diseño de la chaqueta es moderno y elegante, con un corte ajustado y detalles de alta calidad como cremalleras doradas y un cuello alto para mayor protección contra el frío. La chaqueta también cuenta con bolsillos laterales para mayor comodidad.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490579/nextShop/wrho8ofczwpsm1pjgodh.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490578/nextShop/rg9mbaljhz5htbgdlry1.jpg",
      ],
      inStock: 15,
      price: 120500,
      sizes: ["XS", "S", "M", "L"],
      slug: "chaquta_irealistic_fall_-_multicolor",
      type: "chaqueta",
      tags: ["camisa", "manga_larga", "chaqueta"],
      title: "Chaqueta Irealistic fall - Multicolor",
      gender: "hombre",
    },
    {
      description:
        "Añade un toque de estilo clásico a tu guardarropa con nuestra boina café unisex. Esta boina es perfecta para aquellos que buscan una prenda de vestir atemporal y elegante que se adapte a cualquier ocasión. La boina está hecha de un material de alta calidad que es suave, cómodo y duradero. El color café neutro es perfecto para combinar con cualquier outfit, lo que la convierte en una prenda versátil que puedes usar una y otra vez.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490632/nextShop/ylepe6huezbf1fmfmor5.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490631/nextShop/mrqwwdt67fqbsecnahnt.jpg",
      ],
      inStock: 15,
      price: 70000,
      sizes: ["XS", "S", "M"],
      slug: "boina_cafe_unisex",
      type: "sombrero",
      tags: ["boina", "sombrero"],
      title: "Boina cafe unisex",
      gender: "unisex",
    },
    {
      description:
        "Mantén tu estilo elegante y sofisticado con nuestra chaqueta gris unisex. Esta chaqueta es perfecta para aquellos que buscan una prenda de vestir versátil y elegante que se adapte a cualquier ocasión.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490677/nextShop/w41hlx2wdgjazh6snoss.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490678/nextShop/c3xzrs6f2ucucgpdgpah.jpg",
      ],
      inStock: 13,
      price: 85000,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "chaqueta_gris_elegante",
      type: "chaqueta",
      tags: ["chaqueta", "gris", "elegante"],
      title: "Chaqeta gris elegante",
      gender: "unisex",
    },
    {
      description:
        "La gorra ajustable Nike Sportswear AeroBill Featherlight es una excelente opción para cualquier persona que busque una gorra cómoda y funcional. La tela absorbente de sudor y los insertos de malla ayudan a mantener la cabeza fresca y seca durante todo el día. Esta gorra viene en un color gris fútbol/negro y tiene un diseño moderno y elegante que se adapta a cualquier estilo. Además, Nike es una marca reconocida por su calidad e innovación en productos deportivos, lo que garantiza que esta gorra será duradera y resistente al desgaste.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490720/nextShop/lfzoxvszhhmaextvgk7s.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490719/nextShop/ng832yrrg1jm38so2ahh.jpg",
      ],
      inStock: 11,
      price: 30000,
      sizes: ["XS", "S", "M", "L", "XL"],
      slug: "gorra_nike_negra",
      type: "sombrero",
      tags: ["gorra", "sombrero", "nike"],
      title: "Gorra nike negra",
      gender: "unisex",
    },
    {
      description:
        "El gorro tejido amarillo es una excelente opción para agregar un toque de color y estilo a cualquier atuendo de invierno. Este gorro está hecho de lana suave y cálida, lo que lo hace perfecto para mantener la cabeza caliente en climas fríos.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490922/nextShop/dbk12hhap959jubkzb9m.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681490923/nextShop/mwtgeaa2w5df4cwrdu4k.jpg",
      ],
      inStock: 13,
      price: 35000,
      sizes: ["XS", "S", "M", "L"],
      slug: "gorro_tejido_amarillo",
      type: "sombrero",
      tags: ["sombrero", "gorro", "pasamontañas"],
      title: "Gorro tejido amarillo",
      gender: "unisex",
    },
    {
      description:
        "El vestido rosa con bordado es una prenda elegante y femenina que es perfecta para cualquier ocasión especial. El color rosa suave es perfecto para agregar un toque de dulzura y feminidad a cualquier atuendo, mientras que el bordado detallado le da un aspecto único y artesanal. Este vestido puede ser utilizado tanto para eventos formales como informales, lo que lo convierte en una excelente opción para cualquier persona que busque una prenda versátil y elegante.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491028/nextShop/y2300q649ensh7njqd4g.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491027/nextShop/ga8zrigxr4d05xtlmeot.jpg",
      ],
      inStock: 85,
      price: 225000,
      sizes: ["XS", "S", "M", "L"],
      slug: "vestido_rosa_bordado",
      type: "vestido",
      tags: ["vestido", "rosa"],
      title: "Vesitdo rosa con bordados",
      gender: "mujer",
    },
    {
      description:
        "Los tacones rojos son una prenda elegante y llamativa que es perfecta para cualquier ocasión especial. El color rojo vibrante es perfecto para agregar un toque de color y estilo a cualquier atuendo, mientras que los tacones altos le dan un aspecto sofisticado y elegante. Estos tacones están diseñados con materiales de alta calidad para garantizar su durabilidad y resistencia al desgaste.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491058/nextShop/pe9mjdtxhx639ypzw1xo.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491058/nextShop/n9lrmk1rtevas2lndoft.jpg",
      ],
      inStock: 10,
      price: 130500,
      sizes: ["30", "33", "35", "40"],
      slug: "tacones_rojos_disenador",
      type: "zapatos",
      tags: ["zapatos", "tacones", "elegante"],
      title: "Tacones rojos de diseñador",
      gender: "mujer",
    },
    {
      description:
        "El hoodie azul de invierno es una prenda cómoda y funcional que es perfecta para mantenerse abrigado en climas fríos. Este hoodie está hecho de materiales suaves y cálidos, como el forro polar, lo que lo hace perfecto para usar en invierno. El color azul es un tono clásico y versátil que se adapta a cualquier estilo, mientras que la capucha ayuda a mantener la cabeza caliente en climas fríos.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491165/nextShop/ljmjhxm4feirzurrsa0s.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491164/nextShop/pzcrddzkxgw4gouos2el.jpg",
      ],
      inStock: 9,
      price: 110000,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "hoodie_chaqueta_invierno_azul",
      type: "chaqueta",
      tags: ["hoodie", "chaqueta"],
      title: "Hoodie chaqueta para el invierno azul",
      gender: "mujer",
    },
    {
      description:
        "La blusa azul celeste es una prenda elegante y femenina que es perfecta para cualquier ocasión. El color azul celeste suave es perfecto para agregar un toque de dulzura y feminidad a cualquier atuendo, mientras que el diseño de la blusa puede variar dependiendo del estilo.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491208/nextShop/tzo8ktf2ca4c9wudbspq.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491207/nextShop/b6vk2iv9axxm9vvlknfw.jpg",
      ],
      inStock: 10,
      price: 55000,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "blusa_azul_celeste_polo",
      type: "camisa",
      tags: ["camisa", "azul", "polo"],
      title: "Blusa azul celeste estilo polo",
      gender: "mujer",
    },
    {
      description:
        "El short rojo es una prenda llamativa y versátil que es perfecta para el verano. El color rojo vibrante es perfecto para agregar un toque de color y estilo a cualquier atuendo, mientras que el diseño del short puede variar dependiendo del estilo. Esta prenda puede ser utilizada tanto para eventos formales como informales, lo que la convierte en una excelente opción para cualquier persona que busque una prenda versátil y elegante.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491270/nextShop/bhkji16pevup095n6phl.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491270/nextShop/wjlar5zdhtxlkzsf6udb.jpg",
      ],
      inStock: 0,
      price: 40000,
      sizes: ["XS", "S"],
      slug: "short_rojo",
      type: "pantalon",
      tags: ["short", "pantalon"],
      title: "Shorts rojo",
      gender: "mujer",
    },
    {
      description:
        "Los shorts marca Larabel son una prenda de alta calidad y elegante que es perfecta para el verano. Estos shorts están diseñados con materiales de alta calidad para garantizar su durabilidad y resistencia al desgaste. El diseño puede variar dependiendo del estilo, pero en general, los shorts Larabel tienen un aspecto moderno y sofisticado que los hace perfectos para cualquier ocasión casual.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491352/nextShop/kjiclmguqbzba86e1i1g.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491351/nextShop/zw0gvzxm06lw7wyzmaan.jpg",
      ],
      inStock: 30,
      price: 35000,
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      slug: "shorts_larabel",
      type: "pantalon",
      tags: ["pantalon", "short"],
      title: "Shorts marca Larabel",
      gender: "mujer",
    },
    {
      description:
        "La pantaloneta de hombre marca RFT es una prenda cómoda y funcional que es perfecta para el verano. Está diseñada con materiales de alta calidad, lo que garantiza su durabilidad y resistencia al desgaste. El diseño puede variar dependiendo del estilo, pero en general, las pantalonetas RFT tienen un aspecto moderno y sofisticado que las hace perfectas para cualquier ocasión casual.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491390/nextShop/it6o5l50q5jsoi9g3ypj.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491390/nextShop/nlnf6yt8qhlgyjbnegsx.jpg",
      ],
      inStock: 16,
      price: 45000,
      sizes: ["XS", "S", "L", "XL", "XXL"],
      slug: "pantaloneta_hombre_rift",
      type: "pantalon",
      tags: ["pantalon", "pantaloneta"],
      title: "Pantaloneta para hombre marca Rift",
      gender: "hombre",
    },
    {
      description:
        "Esta chaqueta gris para niños es una prenda versátil y funcional, perfecta para cualquier ocasión. Confeccionada en un suave y resistente tejido de algodón, cuenta con un diseño clásico y atemporal que nunca pasa de moda. Su corte recto y suave al tacto proporciona una gran comodidad y libertad de movimiento para los más pequeños.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491436/nextShop/tnlsxfdb4syul58qeb39.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491436/nextShop/tbeyrqc70wap6i72tj1d.jpg",
      ],
      inStock: 10,
      price: 55000,
      sizes: ["XS", "S", "M"],
      slug: "chaqueta_capucha_nino",
      type: "chaqueta",
      tags: ["chaqueta", "hoodie"],
      title: "Chaqueta con capicha para niños",
      gender: "infantil",
    },
    {
      description:
        "Este gorro de lana en color gris es el complemento perfecto para mantener a los niños calientes durante los días fríos de invierno. Confeccionado con materiales de alta calidad, este gorro ofrece una sensación suave y cómoda al contacto con la piel. El diseño clásico de gorro tejido cuenta con un acabado plegable en la parte inferior, lo que proporciona una mayor protección contra el viento y el frío.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491485/nextShop/maspwl1jig09dekfexme.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491485/nextShop/tcidvfa6cxrxixjfpscj.jpg",
      ],
      inStock: 0,
      price: 30000,
      sizes: ["XS", "S", "M"],
      slug: "gorro_invierno_ninos",
      type: "sombrero",
      tags: ["sombrero", "gorro", "invierno"],
      title: "Gorro de invierno para niños",
      gender: "infantil",
    },
    {
      description:
        "Esta chaqueta de invierno en color miel para niños es la prenda perfecta para mantener a los más pequeños abrigados en los días fríos. Confeccionada con materiales de alta calidad, esta chaqueta ofrece una sensación suave y cómoda al contacto con la piel. El diseño cuenta con una cremallera frontal y un cierre de botón a presión para brindar una mayor protección contra el viento y el frío.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491520/nextShop/suxdbbajokchc9fth1wu.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491521/nextShop/q41x4nc9hf5gm8wmsfa9.jpg",
      ],
      inStock: 10,
      price: 80000,
      sizes: ["XS", "S", "M"],
      slug: "chaqueta_inivierno_nino",
      type: "chaqueta",
      tags: ["chaqueta", "invierno", "capucha"],
      title: "Chaqueta para invierno para niños",
      gender: "infantil",
    },
    {
      description:
        "Esta camisa de manga larga para niños es la prenda perfecta para ocasiones formales y casuales. Confeccionada con materiales de alta calidad, esta camisa ofrece una sensación suave y cómoda al contacto con la piel. El diseño cuenta con mangas largas y cierre frontal de botones, lo que lo hace fácil de poner y quitar. La camisa es versátil y fácil de combinar con diferentes atuendos.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491627/nextShop/kldn7wizup1jemvpmsti.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491626/nextShop/snyzzhhid47gdgao1tg8.jpg",
      ],
      inStock: 10,
      price: 45000,
      sizes: ["XS", "S", "M"],
      slug: "camisa_manga_larga_nino",
      type: "camisa",
      tags: ["camisa", "manga_larga"],
      title: "Camisa manga larga para niños",
      gender: "infantil",
    },
    {
      description:
        "Este mameluco es una prenda esencial para los bebés y niños pequeños. Confeccionado con materiales suaves y cómodos, este mameluco ofrece una sensación agradable al contacto con la piel.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491686/nextShop/nr9kiswdqf3rabbdc98u.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491685/nextShop/lbenbod6v78fw6xt4eoz.jpg",
      ],
      inStock: 10,
      price: 30000,
      sizes: ["XS", "S", "M"],
      slug: "mameluco_cuerpo_completo_nino",
      type: "camisa",
      tags: ["camisa", "mameluco"],
      title: "Mameluco cuerpo completo para niño",
      gender: "infantil",
    },
    {
      description:
        "Este sombrero amarillo es una opción divertida y práctica para los niños que necesitan protección solar durante los días soleados. Confeccionado con materiales de alta calidad, este sombrero es suave y cómodo al contacto con la piel del niño. El diseño cuenta con una visera que protege el rostro del niño del sol, así como también ofrece una mayor protección para los ojos.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491727/nextShop/zp6oj6w1ny9mxrkouvih.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491727/nextShop/pfdllrugwduhpwjjozgp.jpg",
      ],
      inStock: 10,
      price: 25000,
      sizes: ["XS", "S", "M"],
      slug: "sombrero_color_amarillo_ninos",
      type: "sombrero",
      tags: ["sombrero"],
      title: "Sombrero color amarillo para niños",
      gender: "infantil",
    },
    {
      description:
        "Esta chaqueta amarilla para niños es una prenda imprescindible para la temporada de frío. Confeccionada con materiales de alta calidad, esta chaqueta es suave y cálida al contacto con la piel del niño. El diseño cuenta con una capucha y cierre frontal de cremallera, lo que hace que sea fácil de poner y quitar.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491760/nextShop/p4z5k1bljbs9mfpianjs.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491761/nextShop/niw6empqgptkbmx6tuo2.jpg",
      ],
      inStock: 16,
      price: 65000,
      sizes: ["XS", "S"],
      slug: "chaqueta_amarilla_capucha_nino",
      type: "chaqueta",
      tags: ["chaqueta", "hoodie", "capucha"],
      title: "Chaqueta amarilla con capucha para niños",
      gender: "infantil",
    },
    {
      description:
        "Este chaleco bordado para niños es una prenda elegante y sofisticada, perfecta para cualquier ocasión especial. Confeccionado en un suave y resistente tejido de algodón, cuenta con un diseño clásico y atemporal que nunca pasa de moda. El chaleco presenta un hermoso bordado en la parte frontal, lo que le da un toque único y especial.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491798/nextShop/lmsnmpr7ldrzeug4cspf.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491797/nextShop/fnrxmrmvndvkzl0ya53v.jpg",
      ],
      inStock: 0,
      price: 85000,
      sizes: ["XS", "S"],
      slug: "chaleco_amarillo_bordado_ninos",
      type: "camisa",
      tags: ["chaleco", "camisa"],
      title: "Chaleco amarillo bordado para niños",
      gender: "infantil",
    },
    {
      description:
        "Esta gorra roja para niños es una prenda divertida y funcional, perfecta para proteger a los más pequeños del sol y el viento. Confeccionada en un resistente tejido de algodón, cuenta con un diseño clásico y atemporal que nunca pasa de moda.",
      images: [
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491888/nextShop/xwcpyhr9adcnjvblvahx.jpg",
        "https://res.cloudinary.com/sebastianow/image/upload/v1681491836/nextShop/hudkngto4r420pkpjfea.jpg",
      ],
      inStock: 10,
      price: 30000,
      sizes: ["XS", "S"],
      slug: "gorra_roja_nino",
      type: "sombrero",
      tags: ["sombrero", "gorra"],
      title: "Gorra roja para niños",
      gender: "infantil",
    },
  ],
};
