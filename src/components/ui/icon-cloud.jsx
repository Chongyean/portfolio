"use client";
import { useEffect, useMemo, useState } from "react";
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
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    // dragControl: false,
  },
};

const renderCustomIcon = (icon, theme, onSelect) => {
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
      onClick: (e) => {
        e.preventDefault();
        onSelect({
          name: icon.title,
          about: `${icon.title} is shown from the Simple Icons catalog in this skills globe.`,
        });
      },
    },
  });
};

export default function IconCloud({
  // Default to an empty array if not provided
  iconSlugs = [],

  imageArray = [],
}) {
  const [data, setData] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (iconSlugs.length > 0) {
      // Check if iconSlugs is not empty
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons)
      .filter((icon) => icon?.title && icon.title.toLowerCase() !== "icon")
      .map((icon) => renderCustomIcon(icon, theme || "dark", setSelectedIcon));
  }, [data, theme]);

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

  return (
    <div className="w-full">
      {/* @ts-ignore */}
      <Cloud {...cloudProps}>
        <>
          <>{renderedIcons}</>
          {normalizedImages.map((image, index) => {
            return (
              <a
                key={index}
                href="#"
                title={image.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedIcon({ name: image.name, about: image.about });
                }}
              >
                <img height="42" width="42" alt={image.name} src={image.src} />
              </a>
            );
          })}
        </>
      </Cloud>

      {selectedIcon && (
        <div className="mt-4 rounded-lg border border-cyan-400/30 bg-slate-900/80 px-4 py-3 text-left">
          <p className="text-cyan-300 font-semibold text-sm">{selectedIcon.name}</p>
          <p className="text-slate-300 text-xs mt-1 leading-relaxed">{selectedIcon.about}</p>
        </div>
      )}
    </div>
  );
}

IconCloud.propTypes = {
  iconSlugs: PropTypes.arrayOf(PropTypes.string),
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
