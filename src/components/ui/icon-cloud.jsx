"use client";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "next-themes";
import { Cloud, fetchSimpleIcons, renderSimpleIcon } from "react-icon-cloud";

const cloudProps = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 0,
    tooltipDelay: 0,
    outlineColour: "#000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};

const renderCustomIcon = (icon, theme, onSelect, customAbout) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: "#",
      "data-cloud-icon": "true",
      className: "transition-all duration-300 ease-out",
      onClick: (e) => {
        e.preventDefault();
        onSelect({
          name: icon.title,
          about:
            customAbout ||
            `${icon.title} is shown from the Simple Icons catalog in this skills globe.`,
        }, e.currentTarget);
      },
    },
  });
};

const CloudCanvas = memo(function CloudCanvas({ renderedIcons, imageNodes }) {
  return (
    // @ts-ignore
    <Cloud {...cloudProps}>
      <>
        <>{renderedIcons}</>
        <>{imageNodes}</>
      </>
    </Cloud>
  );
});

CloudCanvas.propTypes = {
  renderedIcons: PropTypes.node,
  imageNodes: PropTypes.arrayOf(PropTypes.node),
};

export default function IconCloud({
  // Default to an empty array if not provided
  iconSlugs = [],

  imageArray = [],
  iconDescriptions = {},
}) {
  const [data, setData] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const { theme } = useTheme();
  const wrapperRef = useRef(null);
  const cloudRootRef = useRef(null);
  const clickAnimationTimeoutRef = useRef(null);

  const clearIconFocusState = useCallback(() => {
    if (!cloudRootRef.current) return;

    const anchors = cloudRootRef.current.querySelectorAll('a[data-cloud-icon="true"]');
    anchors.forEach((anchor) => {
      anchor.classList.remove(
        "blur-[1.5px]",
        "opacity-40",
        "scale-95",
        "blur-0",
        "opacity-100",
        "scale-110",
        "animate-pulse"
      );
    });
  }, []);

  const applyIconFocusState = useCallback((activeAnchor) => {
    if (!cloudRootRef.current) return;

    const anchors = cloudRootRef.current.querySelectorAll('a[data-cloud-icon="true"]');
    anchors.forEach((anchor) => {
      const isActive = anchor === activeAnchor;
      anchor.classList.remove(
        "blur-[1.5px]",
        "opacity-40",
        "scale-95",
        "blur-0",
        "opacity-100",
        "scale-110",
        "animate-pulse"
      );

      if (isActive) {
        anchor.classList.add("blur-0", "opacity-100", "scale-110", "animate-pulse");
      } else {
        anchor.classList.add("blur-[1.5px]", "opacity-40", "scale-95", "animate-pulse");
      }
    });

    if (clickAnimationTimeoutRef.current) {
      clearTimeout(clickAnimationTimeoutRef.current);
    }

    clickAnimationTimeoutRef.current = setTimeout(() => {
      anchors.forEach((anchor) => anchor.classList.remove("animate-pulse"));
    }, 550);
  }, []);

  const handleSelectIcon = useCallback((icon, clickedAnchor) => {
    if (cloudRootRef.current) {
      cloudRootRef.current.classList.add("scale-[0.985]");
      setTimeout(() => {
        cloudRootRef.current?.classList.remove("scale-[0.985]");
      }, 220);
    }

    applyIconFocusState(clickedAnchor);
    setSelectedIcon((prev) => {
      if (prev?.name === icon.name && prev?.about === icon.about) {
        return prev;
      }
      return icon;
    });
  }, [applyIconFocusState]);

  useEffect(() => {
    const handleDocumentPointerDown = (event) => {
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(event.target)) return;

      setSelectedIcon(null);
      clearIconFocusState();
    };

    document.addEventListener("pointerdown", handleDocumentPointerDown);

    return () => {
      document.removeEventListener("pointerdown", handleDocumentPointerDown);

      if (clickAnimationTimeoutRef.current) {
        clearTimeout(clickAnimationTimeoutRef.current);
      }
    };
  }, [clearIconFocusState]);

  useEffect(() => {
    if (iconSlugs.length > 0) {
      // Check if iconSlugs is not empty
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.entries(data.simpleIcons)
      .filter(([, icon]) => icon?.title && icon.title.toLowerCase() !== "icon")
      .map(([slug, icon]) => {
        const customAbout =
          iconDescriptions[slug] ||
          iconDescriptions[icon.title] ||
          iconDescriptions[icon.title.toLowerCase()];

        return renderCustomIcon(icon, theme || "dark", handleSelectIcon, customAbout);
      });
  }, [data, theme, handleSelectIcon, iconDescriptions]);

  const normalizedImages = useMemo(
    () =>
      imageArray.map((item) =>
        typeof item === "string"
          ? {
              src: item,
              name: "Custom Icon",
              about: "Custom skill icon added to the globe.",
            }
          : {
              src: item.src,
              name: item.name || "Custom Icon",
              about: item.about || "Custom skill icon added to the globe.",
            }
      ),
    [imageArray]
  );

  const imageNodes = useMemo(
    () =>
      normalizedImages.map((image, index) => {
        return (
          <a
            key={`${image.src}-${index}`}
            href="#"
            data-cloud-icon="true"
            title={image.name}
            className="transition-all duration-300 ease-out"
            onClick={(e) => {
              e.preventDefault();
              handleSelectIcon({ name: image.name, about: image.about }, e.currentTarget);
            }}
          >
            <img height="42" width="42" alt={image.name} src={image.src} />
          </a>
        );
      }),
    [normalizedImages, handleSelectIcon]
  );

  return (
    <div ref={wrapperRef} className="relative w-full">
      {selectedIcon && (
        <div className="pointer-events-none absolute left-1/2 top-5 z-20 w-[92%] max-w-md -translate-x-1/2 animate__animated animate__fadeInDown">
          <div className="relative rounded-2xl border-2 border-cyan-300/60 bg-slate-950/95 px-4 py-3 shadow-[0_10px_30px_rgba(34,211,238,0.22)]">
            <p className="text-cyan-200 font-semibold text-sm">{selectedIcon.name}</p>
            <p className="text-slate-200 text-xs mt-1 leading-relaxed">{selectedIcon.about}</p>

            <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-[12px] border-l-transparent border-r-transparent border-t-cyan-300/60" />
            <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 translate-y-[-2px] border-l-[9px] border-r-[9px] border-t-[11px] border-l-transparent border-r-transparent border-t-slate-950/95" />
          </div>
        </div>
      )}

      <div ref={cloudRootRef} className="transition-all duration-300 ease-out">
        <CloudCanvas renderedIcons={renderedIcons} imageNodes={imageNodes} />
      </div>
    </div>
  );
}

IconCloud.propTypes = {
  iconSlugs: PropTypes.arrayOf(PropTypes.string),
  iconDescriptions: PropTypes.objectOf(PropTypes.string),
  imageArray: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        name: PropTypes.string,
        about: PropTypes.string,
      }),
    ])
  ),
};
