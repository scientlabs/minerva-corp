"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import { getNavItems } from "../common/navItems";
import tspProductDetails from "../data/tspProductDetails.json";
import MinervaLogo from "../assets/MINERVA-logo.png";

const Products = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDetailImage, setSelectedDetailImage] = useState("");
  const [validDetailImages, setValidDetailImages] = useState([]);
  const [mainImageLoadFailed, setMainImageLoadFailed] = useState(false);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const navRef = useRef(null);
  const [activeNavItem, setActiveNavItem] = useState('products');
  const { slug } = useParams();
  
  const navItems = getNavItems(t);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [currentLang, setCurrentLang] = useState('ja');
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setCurrentLang(savedLanguage);
    } else {
      i18n.changeLanguage("ja");
      localStorage.setItem("language", "ja");
    }
  }, [i18n]);


  // Product catalog mirrored from:
  // https://www.tspco.jp/products_category/security_camera_system/
  const productCategories = [
    {
      id: 'security-camera',
      name: t("security_camera_system"),
      subcategories: [
        {
          id: 'wireless',
          name: t("wireless_camera_system"),
          products: [
            {
              name: "TSP-W1-0412",
              description: "TSPインスタント防犯ソリューション ワイヤレスカメラセット",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-W1-0412_set.png",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TSP-S01",
              description: "ソーラーパネル付きワイヤレスカメラ",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-S01_1-_800.png",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TSP-W1-0415",
              description: "TSPインスタント防犯ソリューション ワイヤレスカメラセット",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-W1-0415_600.png",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TSP-WB-5M6-1",
              description: "ワイヤレスバレットカメラ（TSP-W1-0415/0412構成対象品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-WB-5M6-1_s.png",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TSP-WT-3M6-1",
              description: "ワイヤレスタレットPTカメラ（TSP-W1-0415/0412構成対象品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-WT-3M6-1_s.png",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TSP-WD-5M6-1",
              description: "ワイヤレスドームPTカメラ（TSP-W1-0415/0412オプション品）",
              image: "",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TWCS-5101",
              description: "TSPインスタント防犯ソリューション ワイヤレスカメラセット",
              image: "",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TWCB-501",
              description: "Wi-Fi バレットカメラ（TWCS-5101構成対象品）",
              image: "https://www.tspco.jp/wp-content/uploads/TWCB-501_s.png",
              category: "ワイヤレスカメラシステム"
            },
            {
              name: "TWCD-502",
              description: "Wi-Fi ドーム ネットワークカメラ（TWCS-5101オプション品）",
              image: "",
              category: "ワイヤレスカメラシステム"
            }
          ]
        },
        {
          id: 'network',
          name: t("network_camera"),
          products: [
            {
              name: "TSP-PT-5M",
              description: "PoEタレットカメラ（TSP-P1-0411/0211オプション品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-PT-5M_s.png",
              category: "ネットワークカメラ"
            },
            {
              name: "TSP-PD-5M",
              description: "PoEドームカメラ（TSP-P1-0411/0211オプション品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-PD-5M_s.png",
              category: "ネットワークカメラ"
            },
            {
              name: "TSP-PB-5M",
              description: "PoEバレットカメラ（TSP-P1-0411/0211構成対象品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-PB-5M_s.png",
              category: "ネットワークカメラ"
            },
            {
              name: "TSP-P1-0411/0211",
              description: "TSPインスタント防犯ソリューション 有線PoEカメラセット",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-P1-0411_0211_set.png",
              category: "ネットワークカメラ"
            },
            {
              name: "TIZ-402",
              description: "IP 魚眼カメラ",
              image: "",
              category: "ネットワークカメラ"
            },
            {
              name: "TID-403",
              description: "電動バリフォーカル ドームカメラ",
              image: "",
              category: "ネットワークカメラ"
            },
            {
              name: "TID-402",
              description: "IP バリフォーカル ドームカメラ",
              image: "",
              category: "ネットワークカメラ"
            },
            {
              name: "TID-401",
              description: "IP ドームカメラ",
              image: "",
              category: "ネットワークカメラ"
            },
            {
              name: "TIB-403",
              description: "IP AIバレットカメラ",
              image: "",
              category: "ネットワークカメラ"
            },
            {
              name: "TIB-402",
              description: "IP バレットカメラ",
              image: "",
              category: "ネットワークカメラ"
            },
            {
              name: "TIB-401",
              description: "IP AIバレットカメラ",
              image: "",
              category: "ネットワークカメラ"
            }
          ]
        },
        {
          id: 'recorder',
          name: t("recorder"),
          products: [
            {
              name: "TSP-P1-NVR11",
              description: "モニターレコーダー（TSP-P1-0411/0211構成対象品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-P1-NVR11_ph01_s.png",
              category: "レコーダー"
            },
            {
              name: "TSP-W1-NVR12",
              description: "ワイヤレスモニターレコーダー（TSP-W1-0412構成対象品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-W1-0412_set.png",
              category: "レコーダー"
            },
            {
              name: "TSP-W1-NVR15",
              description: "ワイヤレスモニターレコーダー（TSP-W1-0415構成対象品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-W1-NVR15_500.png",
              category: "レコーダー"
            }
          ]
        },
        {
          id: 'analog',
          name: t("analog_camera"),
          products: [
            {
              name: "TD-402",
              description: "ドームカメラ",
              image: "",
              category: "アナログカメラ"
            },
            {
              name: "TD-401",
              description: "ドームカメラ",
              image: "",
              category: "アナログカメラ"
            },
            {
              name: "TB-402",
              description: "バレットカメラ",
              image: "",
              category: "アナログカメラ"
            },
            {
              name: "TB-401",
              description: "バレットカメラ",
              image: "",
              category: "アナログカメラ"
            }
          ]
        }
      ]
    },
    {
      id: 'security-recorder',
      name: t("security_camera_recorder"),
      subcategories: [
        {
          id: 'security-recorder-products',
          name: t("security_camera_recorder"),
          products: [
            {
              name: "TXVR-401H",
              description: "ハイブリッド XVR",
              image: "",
              category: "防犯カメラシステムレコーダー"
            },
            {
              name: "TXVR-801H",
              description: "ハイブリッド XVR",
              image: "",
              category: "防犯カメラシステムレコーダー"
            },
            {
              name: "TNVR-802H",
              description: "ネットワークビデオレコーダー",
              image: "",
              category: "防犯カメラシステムレコーダー"
            },
            {
              name: "TNVR-401HP",
              description: "PoE ネットワークビデオレコーダー",
              image: "",
              category: "防犯カメラシステムレコーダー"
            },
            {
              name: "TNVR-162H",
              description: "ネットワークビデオレコーダー",
              image: "",
              category: "防犯カメラシステムレコーダー"
            },
            {
              name: "TNVR-321H",
              description: "ネットワークビデオレコーダー",
              image: "",
              category: "防犯カメラシステムレコーダー"
            },
            {
              name: "TENC-401",
              description: "ビデオエンコーダ",
              image: "",
              category: "防犯カメラシステムレコーダー"
            },
            {
              name: "TSP-DLC012U",
              description: "カメラ側面360度全周を高解像度で撮影",
              image: "",
              category: "防犯カメラシステムレコーダー"
            }
          ]
        }
      ]
    },
    {
      id: 'access-control',
      name: t("access_control_system"),
      subcategories: [
        {
          id: 'biometric',
          name: t("biometric_device"),
          products: [
            {
              name: "AC-2200",
              description: "IP65防塵防水、Bluetoothをサポートするプレミアム屋外指紋認識端末",
              image: "https://www.tspco.jp/wp-content/uploads/AC2200_03-1_s.png",
              category: "生体認証デバイス"
            },
            {
              name: "UBio-X Face Premium",
              description: "ウォークスルー方式 8インチプレミアム顔認識端末",
              image: "https://www.tspco.jp/wp-content/uploads/230905_UBio-X-Face-Pro_02_s-1.png",
              category: "生体認証デバイス"
            },
            {
              name: "UBio-X Face Pro",
              description: "次世代マルチパフォーマンス生体認証デバイス",
              image: "https://www.tspco.jp/wp-content/uploads/230905_UBio-X-Face-Pro_02_s.png",
              category: "生体認証デバイス"
            }
          ]
        }
      ]
    },
    {
      id: 'network-equipment',
      name: t("network_equipment"),
      subcategories: [
        {
          id: 'network-devices',
          name: t("network_devices"),
          products: [
            {
              name: "8ポートギガビットイーサネットPoE+スイッチ",
              description: "自己修復ネットワークで信頼性と安定性を向上",
              image: "https://www.tspco.jp/wp-content/uploads/max_561402pro_800_r.png",
              category: "ネットワーク機器"
            },
            {
              name: "561235",
              description: "ギガビット ウルトラ PoE インジェクター",
              image: "https://www.tspco.jp/wp-content/uploads/max_561235pro_800r.png",
              category: "ネットワーク機器"
            },
            {
              name: "TSP-PM1418",
              description: "ポータブルモニター（TWCS-5101オプション品）",
              image: "https://www.tspco.jp/wp-content/uploads/TSP-PM1418_2.png",
              category: "ネットワーク機器・周辺機器"
            },
            {
              name: "561952",
              description: "超長距離屋外高速イーサネットPoE+ エクステンダーキット",
              image: "https://www.tspco.jp/wp-content/uploads/max_561952pro_800_r.png",
              category: "ネットワーク機器"
            },
            {
              name: "509220",
              description: "屋外用 PoE給電5ポート ギガビットスイッチ",
              image: "https://www.tspco.jp/wp-content/uploads/max_509220pro_1000s.png",
              category: "ネットワーク機器"
            }
          ]
        }
      ]
    },
    // {
    //   id: 'solution',
    //   name: t("solution_products"),
    //   subcategories: [
    //     {
    //       id: 'solutions',
    //       name: t("solutions"),
    //       products: [
    //         {
    //           name: "VIPORE",
    //           description: t("vipore_desc"),
    //           image: "https://www.tspco.jp/wp-content/uploads/top_productimg04-e1747103985344.png",
    //           category: "ソリューション商材"
    //         }
    //       ]
    //     }
    //   ]
    // }
  ];

  const toSlug = (name) => {
    const normalized = name
      .replace(/〖終売〗/g, "discontinued-")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase();
    return normalized || "product";
  };

  const cleanModel = (name) => name.replace(/〖終売〗/g, "").trim();

  const fallbackImagesBySubcategory = {
    wireless: "https://www.tspco.jp/wp-content/uploads/TSP-W1-0415_600.png",
    network: "https://www.tspco.jp/wp-content/uploads/TSP-P1-0411_0211_set.png",
    recorder: "https://www.tspco.jp/wp-content/uploads/TSP-P1-NVR11_ph01_s.png",
    analog: "https://www.tspco.jp/wp-content/uploads/TSP-PB-5M_s.png",
    biometric: "https://www.tspco.jp/wp-content/uploads/AC2200_03-1_s.png",
    "network-devices": "https://www.tspco.jp/wp-content/uploads/max_561402pro_800_r.png"
  };
  const cardDisplayNameOverrides = {
    "TSP-PM1418": "ポータブルモニター（TWCS-5101オプション品）",
    "509220": "超長距離 屋外用防水PoEスイッチ"
  };

  const tspDetailsByProductName = Object.values(tspProductDetails).reduce((acc, item) => {
    if (item?.productName) acc[item.productName] = item;
    return acc;
  }, {});

  const getTspDetail = (normalizedModel) => {
    return tspProductDetails[normalizedModel] || tspDetailsByProductName[normalizedModel] || null;
  };

  const stripExternalLinks = (html) => {
    if (!html) return "";
    // Keep inner markup/content but remove anchor tags to prevent redirects to external pages.
    return html.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1");
  };

  const upscaleImageUrl = (src = "") => src.replace(/-\d+x\d+(?=\.(png|jpe?g|webp|gif|avif)$)/i, "");

  const buildImagePriorityList = (images = []) => {
    const prioritized = [];
    for (const src of images.filter(Boolean)) {
      const upscaled = upscaleImageUrl(src);
      if (upscaled) prioritized.push(upscaled);
      prioritized.push(src);
    }
    return Array.from(new Set(prioritized));
  };

  const isBlockedLogoImage = (src = "", alt = "") => {
    const value = `${src} ${alt}`.toLowerCase();
    return (
      /no-image-logo|head_logo|logo|totalsolutionpartners|株式会社tsp|scrolldpwn_circle|tspco\.jp\/wp-content\/uploads\/.*logo/.test(value)
    );
  };

  const sanitizeDetailHtml = (html) => {
    if (!html) return "";
    return html
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
      .replace(/<img\b[^>]*>/gi, (tag) => {
        const srcMatch = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
        const altMatch = tag.match(/\balt\s*=\s*["']([^"']*)["']/i);
        const src = srcMatch?.[1] || "";
        const alt = altMatch?.[1] || "";
        return isBlockedLogoImage(src, alt) ? "" : tag;
      });
  };

  // Get all products for display
  const getAllProducts = () => {
    const products = [];
    productCategories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        subcategory.products.forEach(product => {
          const normalizedModel = cleanModel(product.name);
          const fallbackImage = product.image || fallbackImagesBySubcategory[subcategory.id] || "";
          const tspDetail = getTspDetail(normalizedModel);
          const rawDetailImages = tspDetail?.detailImages?.length
            ? tspDetail.detailImages
            : (fallbackImage ? [fallbackImage] : []);
          const detailImages = buildImagePriorityList(rawDetailImages).filter((img) => !isBlockedLogoImage(img));
          const preferredImage = buildImagePriorityList([tspDetail?.cardImage, fallbackImage, detailImages[0]]).find(
            (img) => img && !isBlockedLogoImage(img)
          ) || "";

          products.push({
            ...product,
            image: preferredImage,
            displayName: cardDisplayNameOverrides[normalizedModel] || tspDetail?.productName || product.name,
            categoryId: category.id,
            subcategoryId: subcategory.id,
            subcategoryName: subcategory.name,
            slug: toSlug(product.name),
            detailTitle: tspDetail?.detailTitle || product.description,
            productName: tspDetail?.productName || normalizedModel,
            model: tspDetail?.model || normalizedModel,
            supportedFunction: tspDetail?.supportedFunction || product.description,
            detailHtml: sanitizeDetailHtml(stripExternalLinks(tspDetail?.detailHtml || "")),
            detailPageUrl: tspDetail?.pageUrl || "",
            detailImages,
            description: tspDetail?.supportedFunction || product.description
          });
        });
      });
    });
    return products;
  };

  const allProducts = getAllProducts();
  const filteredProducts = selectedCategory 
    ? allProducts.filter(p => p.categoryId === selectedCategory)
    : allProducts;
  const selectedProduct = slug ? allProducts.find((p) => p.slug === slug) : null;
  const toPreviewSrc = (src) => src || "";
  const displayedMainImage = (
    selectedDetailImage ||
    (!mainImageLoadFailed ? toPreviewSrc(upscaleImageUrl(selectedProduct?.image || "")) : "") ||
    validDetailImages[0] ||
    ""
  );
  const movedSummaryTextBySlug = {
    "tsp-dlc012u": "俯角付き魚眼レンズ / プロモーション動画 / 撮影レンズ / 寸法"
  };
  const renderedDetailHtml = (selectedProduct?.detailHtml || "")
    .replace(
      /<li>\s*<div class="imgarea">[\s\S]*?<p class="txtstyle02">\s*(俯角付き魚眼レンズ|プロモーション動画|撮影レンズ|寸法)\s*<\/p>[\s\S]*?<\/li>/gi,
      ""
    )
    .replace(
      /<h3>\s*(TSPインスタント防犯ソリューション　ワイヤレスカメラセット|リピーター機能搭載で隅々までしっかり防犯|外出先でもスマホで遠隔監視|無線接続で設置工事も簡単)\s*<\/h3>/gi,
      '<h3 class="tsp-left-heading">$1</h3>'
    )
    .replace(/<h2>\s*(製品仕様|IPユニット)\s*<\/h2>/gi, '<h2 class="tsp-spec-heading">$1</h2>')
    .replace(/<h3>\s*([^<]+?)\s*<\/h3>\s*(?=<table\b)/gi, '<h3 class="tsp-spec-subheading">$1</h3>')
    .replace(/<h3>\s*セット内容\s*<\/h3>/gi, '<h3 class="tsp-highlight-set">セット内容</h3>')
    .replace(/<h3>\s*オプション[\s\S]*?<\/h3>/gi, (m) => m.replace("<h3>", '<h3 class="tsp-highlight-option">'))
    .replace(/<p class="txtstyle02">\s*(レコーダー|ワイヤレスカメラ)\s*<\/p>/gi, '<p class="txtstyle02 tsp-highlight-col2-title">$1</p>')
    .replace(/【リピーター機能とは】/g, '<span class="tsp-repeater-label">【リピーター機能とは】</span>')
    .replace(/※レコーダー1台に対してカメラは最大4台まで/g, '<span class="tsp-subline">※レコーダー1台に対してカメラは最大4台まで</span>')
    .replace(/万一通信が途絶えても映像確認が可能 ※SDカード別売り/g, '<span class="tsp-subline">万一通信が途絶えても映像確認が可能 ※SDカード別売り</span>')
    .replace(
      /<p>\s*屋外コンセントなどからカメラ電源を引き、工事を行います。[\s\S]*?お気軽にご相談ください。[\s\S]*?<\/p>/g,
      '<div class="tsp-greenbox-copy">屋外コンセントなどからカメラ電源を引き、工事を行います。<br><br>屋外コンセントがない場合は、<br>屋内のコンセントからエアコンのダクト穴を通して屋外に引き出すなどの方法も可能です。<br><br>お気軽にご相談ください。</div>'
    )
    .replace(/<p class="txtstyle02">\s*(TWCB-501|TWCD-502|TSP-PM1418)\s*<\/p>/gi, (_, model) => (
      `<p class="txtstyle02"><a class="internal-product-link" href="/#/products/${toSlug(model)}">${model}</a></p>`
    ));

  useEffect(() => {
    setSelectedDetailImage("");
    setMainImageLoadFailed(false);
  }, [slug]);

  useEffect(() => {
    let cancelled = false;
    const imageCandidates = buildImagePriorityList([
      toPreviewSrc(selectedProduct?.image || ""),
      ...((selectedProduct?.detailImages || []).map((img) => toPreviewSrc(img)))
    ]).filter(Boolean);

    if (!imageCandidates.length) {
      setValidDetailImages([]);
      return () => {
        cancelled = true;
      };
    }

    Promise.all(
      imageCandidates.map(
        (src) =>
          new Promise((resolve) => {
            const testImage = new Image();
            testImage.onload = () => resolve(src);
            testImage.onerror = () => resolve(null);
            testImage.src = src;
          })
      )
    ).then((results) => {
      if (!cancelled) {
        setValidDetailImages(results.filter(Boolean));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedProduct?.slug, selectedProduct?.image, selectedProduct?.detailImages]);

  const ProductImage = ({ product, className }) => {
    if (product.image) {
      return (
        <img
          src={product.image}
          alt={product.name}
          className={className}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      );
    }

    return (
      <div className={`flex items-center justify-center bg-gray-100 text-gray-500 ${className}`}>
        <span className="text-sm text-center px-4">{product.name}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav ref={navRef} className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section - Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-3">
                <img
                  src={MinervaLogo}
                  alt="Minerva Logo"
                  className="h-5 sm:h-6 md:h-14 object-contain"
                />
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <Link
                    to={item.path}
                    className={`font-medium transition-all duration-300 px-3 py-1 rounded-full ${
                      activeNavItem === item.id
                        ? 'text-white shadow-md'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    style={activeNavItem === item.id ? { backgroundColor: '#E02B8A' } : {}}
                  >
                    {item.label}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {hoveredNavItem === item.id && item.subItems && item.subItems.length > 0 && (
                    <div 
                      className="absolute top-full left-0 pt-2 w-48 z-50"
                      onMouseEnter={() => setHoveredNavItem(item.id)}
                      onMouseLeave={() => setHoveredNavItem(null)}
                    >
                      <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        <ul className="space-y-1">
                          {item.subItems.map((subItem, index) => {
                            const isActive = activeNavItem === item.id;
                            return (
                              <li key={index}>
                                <Link
                                  to={subItem.link}
                                  className={`block px-4 py-2 text-sm transition-colors ${
                                    isActive
                                      ? 'bg-pink-50 text-pink-600 font-medium'
                                      : 'text-gray-700 hover:bg-gray-100 hover:text-pink-600'
                                  }`}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {/* <button
                type="button"
                onClick={() => {
                  const next = currentLang === "ja" ? "en" : "ja";
                  i18n.changeLanguage(next);
                  setCurrentLang(next);
                  localStorage.setItem("language", next);
                }}
                className="text-gray-700 transition-colors duration-200 focus:outline-none rounded font-medium flex items-center space-x-2 group"
                onMouseEnter={(e) => e.currentTarget.style.color = '#E02B8A'}
                onMouseLeave={(e) => e.currentTarget.style.color = ''}
                aria-pressed={currentLang === "ja" ? "false" : "true"}
                title="Toggle language"
              >
                <FontAwesomeIcon icon={faGlobe} />
                <span>{currentLang === "ja" ? t("japanese") : "ENGLISH"}</span>
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      {!slug && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("products_title")}
            </h1>
            <p className="text-xl text-gray-600">{t("products_description")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors text-white ${
                  selectedCategory === null ? '' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedCategory === null ? { backgroundColor: '#E02B8A' } : { color: '#E02B8A' }}
              >
                {t("all_products")}
              </button>
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors text-white ${
                    selectedCategory === category.id ? '' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedCategory === category.id ? { backgroundColor: '#E02B8A' } : { color: '#E02B8A' }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={`${product.slug}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
                className="bg-[#f7f7f9] rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-full h-48 bg-[#ececf1] flex items-center justify-center">
                  <ProductImage product={product} className="w-full h-44 object-contain p-4" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.displayName || product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 min-h-[2.5rem]">{(product.description || "").trim() || "製品情報ページをご確認ください。"}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                      {product.category}
                    </span>
                    <Link
                      to={`/products/${product.slug}`}
                      className="text-sm font-semibold"
                      style={{ color: '#E02B8A' }}
                    >
                      {t("view_details")}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">{t("no_products_found")}</p>
            </div>
          )}
        </div>
      )}

      {slug && selectedProduct && (
        <div className="w-full py-12 product-detail-wrap">
          <Link to="/products" className="inline-flex items-center text-sm font-semibold mb-8" style={{ color: '#E02B8A' }}>
            ← {t("back_to_products")}
          </Link>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div>
                <div className="w-full flex items-center justify-center bg-white rounded-xl p-2">
                  {displayedMainImage ? (
                    <img
                      src={displayedMainImage}
                      alt={selectedProduct.name}
                      className="w-full h-[27rem] object-contain"
                      onError={() => {
                        setMainImageLoadFailed(true);
                      }}
                    />
                  ) : (
                    <ProductImage product={selectedProduct} className="w-full h-[27rem] object-contain" />
                  )}
                </div>
                {validDetailImages.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {validDetailImages.slice(0, 6).map((img, idx) => (
                      <button
                        key={`${selectedProduct.slug}-detail-${idx}`}
                        type="button"
                        onClick={() => {
                          setMainImageLoadFailed(false);
                          setSelectedDetailImage(toPreviewSrc(img));
                        }}
                        className="w-full"
                      >
                        <img
                          src={img}
                          alt={`${selectedProduct.name}-${idx + 1}`}
                          className="w-full h-20 object-contain bg-transparent rounded p-1"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">{selectedProduct.subcategoryName}</p>
                <h1 className="text-3xl font-bold mb-4" style={{ color: '#E02B8A' }}>
                  {selectedProduct.slug === "509220" ? (selectedProduct.displayName || selectedProduct.name) : selectedProduct.name}
                </h1>
                <h2 className="text-xl font-semibold mb-6" style={{ color: '#E02B8A' }}>{selectedProduct.detailTitle}</h2>
                <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="space-y-3 text-sm text-gray-700">
                    <p><span className="font-semibold">製品名：</span>{selectedProduct.productName}</p>
                    <p><span className="font-semibold">型番：</span>{selectedProduct.model}</p>
                    <p><span className="font-semibold">対応機能：</span>{selectedProduct.supportedFunction}</p>
                    {movedSummaryTextBySlug[selectedProduct.slug] && (
                      <p><span className="font-semibold">詳細：</span>{movedSummaryTextBySlug[selectedProduct.slug]}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {selectedProduct.category}
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                    {t("security_camera_system")}
                  </span>
                </div>
              </div>
            </div>
            {renderedDetailHtml && (
              <div className={`px-8 pb-8 product-detail-${selectedProduct.slug}`}>
                <div
                  className="tsp-clone-content text-gray-800 leading-relaxed [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_table]:w-full [&_table]:border-collapse [&_table]:my-4 [&_th]:text-left [&_th]:align-top [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:p-2 [&_td]:border [&_td]:border-gray-200 [&_td]:p-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2"
                  dangerouslySetInnerHTML={{ __html: renderedDetailHtml }}
                />
              </div>
            )}
            {!renderedDetailHtml && (
              <div className="px-8 pb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">詳細仕様</h3>
                <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {slug && !selectedProduct && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-500 text-lg mb-4">{t("no_products_found")}</p>
          <Link to="/products" className="font-semibold" style={{ color: '#E02B8A' }}>
            {t("back_to_products")}
          </Link>
        </div>
      )}
      <style>{`
        .product-detail-wrap {
          padding-left: 3cm;
          padding-right: 3cm;
        }
        @media (max-width: 1200px) {
          .product-detail-wrap {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
        .tsp-clone-content img {
          display: block;
          margin: 12px auto;
          max-width: 100%;
          height: auto;
          border: none;
          border-radius: 0;
        }
        .tsp-clone-content .block1 img {
          width: min(100%, 980px);
        }
        .tsp-clone-content h2 {
          color: #E02B8A !important;
          font-size: 2rem !important;
          line-height: 1.2 !important;
          font-weight: 800 !important;
          margin-top: 2rem !important;
          margin-bottom: 0.9rem !important;
        }
        .tsp-clone-content h3 {
          color: #E02B8A !important;
          font-size: 1.25rem !important;
          line-height: 1.35 !important;
          font-weight: 700 !important;
          margin-top: 1.25rem !important;
          margin-bottom: 0.65rem !important;
        }
        .tsp-clone-content .tsp-spec-heading,
        .tsp-clone-content .tsp-spec-subheading {
          width: 62% !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .tsp-clone-content .txtstyle02 {
          color: #E02B8A !important;
        }
        .tsp-clone-content .column01_wrap {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 24px !important;
          align-items: start !important;
        }
        .tsp-clone-content .column01_wrap .w50 {
          width: 100% !important;
        }
        .tsp-clone-content .column01_wrap .imgarea {
          order: 1;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .tsp-clone-content .column01_wrap .txtarea {
          order: 2;
          display: flex !important;
          align-items: center !important;
        }
        .tsp-clone-content .column01_wrap .imgarea img {
          width: 100% !important;
          max-width: 740px !important;
          max-height: 470px !important;
          object-fit: contain !important;
        }
        .tsp-clone-content .flexbox.rev.column01_wrap .imgarea {
          order: 2;
        }
        .tsp-clone-content .flexbox.rev.column01_wrap .txtarea {
          order: 1;
        }
        .tsp-clone-content .card01_list {
          display: grid !important;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
          gap: 18px !important;
          list-style: none !important;
          padding-left: 0 !important;
        }
        .tsp-clone-content .card01_list li {
          display: block !important;
          margin-bottom: 0 !important;
        }
        .tsp-clone-content .card01_list .imgarea {
          text-align: center !important;
          min-height: 250px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .tsp-clone-content .card01_list .imgarea img {
          width: min(100%, 390px) !important;
          height: 250px !important;
          object-fit: contain !important;
          margin-inline: auto !important;
        }
        .tsp-clone-content .card01_list .txtarea {
          margin-top: 10px !important;
          max-width: 440px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .tsp-clone-content .txtinner,
        .tsp-clone-content .txtarea {
          text-align: left !important;
        }
        .tsp-clone-content table {
          table-layout: fixed !important;
          width: 62% !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .tsp-clone-content table th {
          width: 26% !important;
          background: #f5f5f7 !important;
          padding: 0.45rem 0.5rem !important;
          text-align: left !important;
        }
        .tsp-clone-content table td {
          width: 74% !important;
          background: #ffffff !important;
          padding: 0.45rem 0.5rem !important;
        }
        .tsp-clone-content .note_comments {
          width: 62% !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .tsp-clone-content .note_comments span::before {
          content: "※";
          margin-right: 0.1rem;
        }
        .tsp-clone-content .txts {
          max-width: 780px !important;
          margin-top: 10px !important;
          margin-left: 2.2rem !important;
          padding-left: 0.75rem !important;
          text-align: left !important;
          line-height: 1.8 !important;
        }
        .tsp-clone-content .card01_list .txtarea,
        .tsp-clone-content .card01_list .txtinner {
          text-align: center !important;
        }
        .tsp-clone-content .card01_list .txtstyle02 {
          text-align: center !important;
        }
        /* Section 1 style: text box centered under image, bullets left aligned */
        .tsp-clone-content .card01_list.col2_list .txtarea p {
          text-align: left !important;
          line-height: 1.85 !important;
          white-space: nowrap !important;
          font-size: 0.97rem !important;
          margin-bottom: 0.45rem !important;
        }
        .tsp-clone-content .tsp-highlight-set {
          transform: translateX(1.25rem);
          font-size: 1.45rem !important;
          font-weight: 800 !important;
        }
        .tsp-clone-content .tsp-highlight-option {
          transform: translateX(1.25rem);
          font-size: 1.5rem !important;
          font-weight: 900 !important;
        }
        .tsp-clone-content .card01_list.col2_list .txtarea {
          padding-left: 1.1rem !important;
          max-width: 100% !important;
        }
        .tsp-clone-content .tsp-highlight-col2-title {
          font-size: 1.4rem !important;
          font-weight: 700 !important;
        }
        .tsp-clone-content .tsp-subline {
          display: inline-block !important;
          padding-left: 1.1rem !important;
        }
        .tsp-clone-content .internal-product-link {
          color: #E02B8A !important;
          text-decoration: underline !important;
          font-weight: 700 !important;
        }
        .tsp-clone-content .tsp-repeater-label {
          color: #E02B8A !important;
          font-weight: 400 !important;
        }
        .tsp-clone-content .tsp-greenbox-copy {
          margin-top: 11rem !important;
          line-height: 1.8 !important;
          display: block !important;
        }
        .tsp-clone-content .tsp-left-heading,
        .tsp-clone-content .tsp-highlight-set,
        .tsp-clone-content .tsp-highlight-option {
          width: 100% !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          text-align: left !important;
          transform: none !important;
        }
        /* Section 2 style: keep centered under image with same dimensions */
        .tsp-clone-content .card01_list.col3_list .txtarea p {
          text-align: center !important;
        }
        .product-detail-twcs-5101 .tsp-clone-content .card01_list.col2_list .imgarea {
          justify-content: center !important;
          text-align: center !important;
        }
        .product-detail-twcs-5101 .tsp-clone-content .card01_list.col2_list .imgarea img {
          margin-left: auto !important;
          margin-right: auto !important;
          transform: translateX(-7em) !important;
        }
        @media (max-width: 900px) {
          .tsp-clone-content .column01_wrap,
          .tsp-clone-content .card01_list {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Products;
