import { useState } from "react";
import { Link } from "@tanstack/react-router";
import logoAsset from "../assets/ozeonix-infinity-footer-logo.png.asset.json";

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="oz-footer oz-footer--upgraded">
      {/* Background Decorative Vector Graphic — Top Left */}
      <figure className="oz-footer__bg-figure oz-footer__bg-figure--left" aria-hidden="true">
        <svg
          className="oz-footer__svg-curve"
          width="775"
          height="834"
          viewBox="0 0 775 834"
          fill="currentColor"
          focusable="false"
        >
          <path d="M486.1,564.4c-3.6,2.5-7.4,4.8-11.3,6.4c-12,5.5-25.7,7.9-42.2,7.4c-30.6-1.1-65.6-12.5-102.8-24.4 c-50.7-16.2-103.3-33.4-152.5-27c-56.1,7.2-97.9,44.4-128,114l-0.4-0.2c67.5-156.1,181-119.5,281.1-87.1c37,12,72,23.2,102.5,24.3 c34.3,1.2,58.1-10.7,74.9-37.4C530.1,505,547.1,466,565,425.1C619.4,301,675.6,172.7,892.1,141.3l0.1,0.4 c-216.2,31.4-272.5,159.5-326.8,283.5c-18.1,41.1-35,79.7-57.7,115.6C501.6,550.7,494.5,558.5,486.1,564.4z" />
          <path d="M500.9,551.4c-43.7,31-103,15.8-165.5-0.2c-49.9-12.7-101.5-25.8-148.7-16.7c-53.3,10.5-93.2,49-121.6,118 l-0.5-0.1c15.3-37.1,33.3-64.7,55.1-84.7c19.5-17.7,41.3-28.6,66.7-33.7c47.4-9.2,99,3.9,148.9,16.6 c70.4,17.9,137.1,34.9,181.3-14.4c35.7-39.9,57.3-91.7,80.2-146.7c23.8-56.7,48.2-115.5,90.2-163.6c22.7-25.9,48.4-46.4,78.4-62.4 c33.9-18.1,72.2-30.3,117.1-37.1l0.1,0.4C695,155.3,645.2,274.5,597.1,389.7c-22.9,55-44.5,106.8-80.4,146.8 C512.3,542.4,506.6,547.3,500.9,551.4z" />
          <path d="M521.3,536.4c-21.9,15.5-48.4,23.4-80.8,23.8c-31.2,0.5-65.1-5.8-97.9-11.9c-49.3-9.2-100.2-18.7-145.7-6.5 c-51.1,13.7-88.9,53.7-116,122.6l-0.6-0.2c60.5-154.1,163.3-135,262.6-116.5c68.1,12.7,132.6,24.6,183.6-15.8 c48.1-38.2,71.1-100.6,95.6-166.5c20.3-55,41.4-111.6,78.3-158.1c20-25.1,42.7-44.9,69.2-60.5c30.1-17.5,64.2-29.1,104.3-35.4 l0.2,0.6c-167.2,26.3-210,141.9-251.4,253.5C598.3,431.5,575,493.8,527,532.2C525.1,533.8,523.2,535.1,521.3,536.4z" />
          <path d="M548.9,520.3c-4,2.9-8.2,5.6-12.6,8c-56.6,31.5-120.9,23.8-183,16.6c-51.7-6-100.4-11.8-144.6,3.2 c-49.9,16.9-85.5,57.7-111.3,128.2l-0.6-0.2c13.7-37.3,30.1-66,49.9-87.8c17.8-19.4,37.9-32.8,61.8-40.9 c44.3-15,93.1-9.3,144.9-3.2c62.1,7.2,126.3,14.8,182.8-16.6c59.6-33.2,82-104.7,105.9-180.4c17.1-54.3,34.7-110.5,67.2-156.6 c36.7-52,87.8-82.8,155.7-94l0.2,0.6c-151.9,25-187.8,139.3-222.3,250C620.4,417.6,599.4,484.5,548.9,520.3z" />
          <path d="M573.5,509.5c-8.2,5.8-17.4,10.7-27.7,14.6c-59.3,22-119.1,18.8-176.8,15.8c-53.2-2.8-103.3-5.3-147.1,12.5 C172.6,572.3,138.1,615.5,113,688l-0.5-0.1c25.1-72.7,59.6-115.9,108.9-136c44-18,94.2-15.3,147.6-12.6 c57.7,3,117.4,6.1,176.6-15.9c70.7-26.2,91.1-106.3,112.8-191.4c13.9-54.5,28.3-111,56.7-156.9C747,123.2,793,92.6,855.6,82l0,0.7 C716.3,106.5,687,221.4,658.9,332.2C640.4,405,622.6,474.4,573.5,509.5z" />
          <path d="M595.2,502.3c-11.3,8-24.6,14-40,17.4c-56.8,12.7-112,12.7-160.5,12.9c-60.2,0.1-112,0.2-157,21.1 c-49.5,23-84,69.3-108.5,146l-0.6-0.2c24.3-76.7,58.9-123.1,108.6-146.3c45.1-21.1,97.2-21.1,157.4-21.2 c48.6,0,103.6-0.1,160.5-12.9c81.6-18.3,99-106.7,117.4-200.6c10.7-55,22-112,46.6-158.2C747,108,788.6,77.5,846.5,67.2l0.1,0.8 C718,91.2,695.2,206.9,673.2,318.9C658.3,394.9,643.8,467.8,595.2,502.3z" />
          <path d="M615.3,497.4c-13.7,9.7-30.2,16-50.8,18c-44.4,4.6-86.5,5.8-123.6,6.8c-71.2,2-132.8,3.7-182,27.7 C206,575.6,169.8,627,145,711.3l-0.8-0.1c13-44.6,29-79.3,48.6-106.3c18.1-24.9,39.5-43.1,65.6-55.7 c49.5-24.1,110.9-25.8,182.4-27.7c37.1-1,79.3-2.2,123.5-6.7c92.6-9.4,106.2-106.5,120.5-209.2c7.8-55.9,15.9-113.6,37-160 c23.8-52.7,61.6-83.1,115.3-93.4l0.3,0.7c-53.4,10.1-91,40.4-114.6,92.9c-21.1,46.4-29.2,104.1-36.8,159.9 C674.6,386,663.8,463,615.3,497.4z" />
          <path d="M634.4,494c-15.5,11-35.2,17.2-60.4,17.3c-12.3,0.1-24.5,0.1-36.1,0.1c-103.7,0-185.5-0.1-246.4,26.4 c-63.5,27.7-103.7,85-130.5,185.5l-0.8-0.1c13.9-52.5,31.3-92.6,53.2-122.9c20.7-28.8,46.2-49.4,77.8-63.2 c61-26.6,142.9-26.4,246.6-26.4c11.7,0.1,23.8,0,36.1-0.1c103.8-0.2,112.9-105.6,122.5-217.2c4.7-56.9,9.9-115.5,27.5-162.4 c20-53.1,54.1-83.7,104.1-93.7l0.1,0.8c-49.5,9.8-83.5,40.3-103.3,93.1c-17.6,46.9-22.7,105.4-27.6,162 C690.1,378.2,682.9,459.6,634.4,494z" />
          <path d="M652.7,491.8c-17.9,12.7-40.7,17.7-69.2,15.4C328,486.2,228.3,517.5,177.2,735.2l-0.9-0.3 c25.9-110.7,64-171.6,127-204c66.6-34.2,160.2-34.6,280.3-24.7c32.2,2.6,56.9-4.1,75.4-20.5c42.1-37.4,45.1-118.6,48-204.7 c4-116.5,8.1-236.8,112.1-258.6l0.1,0.8C715.9,44.8,711.8,164.8,707.8,280.9c-3.1,86.3-5.8,167.7-48.3,205.2 C657.3,488.3,655,490.1,652.7,491.8z" />
          <path d="M670.6,490.3c-19.3,13.7-44.8,17.9-77.7,12.7c-138.5-21.4-227.1-13-287.3,27 c-55.4,36.8-89.1,101.7-112.4,216.9l-0.9-0.3C215.8,631,249.6,566,305.1,528.9c60.3-40.1,149.1-48.6,288.1-27.3 c35.9,5.5,63,0,82.6-16.9c43.2-37.5,42.2-124.3,40.9-216.1C714.9,151,713,28.8,809.9,7.7l0.1,0.8c-96,21.1-94.3,142.7-92.7,260.6 c1.3,92.1,2.4,179-41.1,216.7C674.3,487.4,672.6,488.9,670.6,490.3z" />
        </svg>
      </figure>

      {/* Background Decorative Vector Graphic — Top Right */}
      <figure className="oz-footer__bg-figure oz-footer__bg-figure--right" aria-hidden="true">
        <svg
          className="oz-footer__svg-grid"
          width="270"
          height="257"
          viewBox="0 0 270 257"
          fill="none"
          focusable="false"
        >
          <g opacity="0.2" clipPath="url(#oz-footer-clip)">
            <path
              d="M103.343 147.898C102.038 147.549 100.998 146.901 100.346 145.988C99.1801 144.331 99.5402 142.003 101.342 139.612L120.854 113.762C123.516 110.231 128.869 107.29 133.819 106.639C136.638 106.261 139.005 106.684 140.488 107.846L158.81 122.087C160.055 123.053 160.558 124.427 160.284 126.041C159.591 129.809 154.693 134.006 148.858 135.79L111.03 147.375C108.066 148.294 105.362 148.439 103.343 147.898Z"
              fill="currentColor"
            />
            <path
              d="M101.655 151.242C100.424 150.912 99.4203 150.327 98.7234 149.481C97.3788 147.803 97.5354 145.446 99.2353 142.844L117.863 114.094C122.177 107.447 133.69 103.178 138.757 106.328L160.527 119.911C162.02 120.839 162.72 122.265 162.543 124.01C162.155 128.018 157.21 132.782 151.052 135.086L110.661 150.228C107.22 151.547 104.019 151.875 101.655 151.242Z"
              fill="currentColor"
            />
            <path
              d="M100.132 154.866C98.9746 154.556 98.0311 154.04 97.3391 153.274C95.8024 151.624 95.7998 149.172 97.3111 146.387L114.628 114.65C118.619 107.337 130.807 101.931 136.724 104.86L162.207 117.488C163.979 118.358 164.901 119.844 164.863 121.758C164.767 126.055 159.988 131.286 153.454 134.201L110.679 153.317C106.7 155.071 102.889 155.605 100.132 154.866Z"
              fill="currentColor"
            />
            <path
              d="M98.9081 158.836C97.8495 158.552 96.9487 158.073 96.2303 157.406C94.5015 155.783 94.2593 153.24 95.6 150.305L111.143 115.536C114.72 107.506 127.521 100.892 134.34 103.51L163.832 114.866C165.939 115.668 167.113 117.195 167.214 119.278C167.461 123.773 162.759 129.603 156.043 133.102L110.976 156.534C106.474 158.86 102.035 159.673 98.9081 158.836Z"
              fill="currentColor"
            />
            <path
              d="M97.9774 163.094C97.0173 162.837 96.1525 162.42 95.4389 161.834C93.4869 160.256 93.0231 157.654 94.0948 154.541L107.353 116.682C110.403 107.957 123.734 99.957 131.517 102.227L165.259 111.901C167.707 112.609 169.183 114.191 169.473 116.457C170.088 121.155 165.549 127.557 158.662 131.695L111.687 159.887C106.654 162.915 101.523 164.044 97.9774 163.094Z"
              fill="currentColor"
            />
            <path
              d="M97.4087 167.686C96.547 167.455 95.7675 167.114 95.0769 166.639C92.8768 165.101 92.1357 162.451 92.9629 159.166L103.372 118.251C105.766 108.823 119.529 99.4096 128.353 101.141L166.587 108.724C169.415 109.297 171.242 110.946 171.745 113.401C172.763 118.366 168.551 125.224 161.479 130.051L112.836 163.384C107.277 167.193 101.446 168.768 97.4087 167.686Z"
              fill="currentColor"
            />
            <path
              d="M97.1729 172.5C96.4589 172.308 95.796 172.025 95.202 171.682C92.7409 170.231 91.6731 167.52 92.2001 164.076L99.117 120.142C100.712 110.052 114.823 99.0453 124.702 100.19L167.682 105.222C170.958 105.599 173.168 107.298 173.921 110.004C175.369 115.137 171.45 122.574 164.385 128.062L114.506 166.995C108.506 171.661 101.752 173.727 97.1729 172.5Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="oz-footer-clip">
              <rect
                width="224.236"
                height="205.171"
                fill="white"
                transform="translate(53.1016) rotate(15)"
              />
            </clipPath>
          </defs>
        </svg>
      </figure>

      <div className="oz-container oz-footer__content">
        {/* Top Header Row — Logo + Branding + Interactive Social Circles */}
        <div className="oz-footer__header">
          <div className="oz-footer__header-brand">
            <img
              className="oz-brand__logo oz-brand__logo--footer oz-footer__header-logo"
              src={logoAsset.url}
              alt="Ozeonix Infinity"
              width={1774}
              height={887}
              decoding="async"
            />
            <div className="oz-footer__header-text">
              <h3 className="oz-footer__header-title">Ozeonix Infinity</h3>
              <p className="oz-footer__header-subtitle">Shape The Thought. Power Tomorrow</p>
            </div>
          </div>

          <div className="oz-footer__socials" aria-label="Ozeonix Infinity social profiles">
            <a
              href="https://www.facebook.com/ozeonix.infinity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.92.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/ozeonix-infinity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/ozeonix.infinity"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.98.98-1.213 2.092-1.272 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.282.292 2.394 1.272 3.374.98.98 2.092 1.213 3.374 1.272C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.282-.059 2.394-.292 3.374-1.272.98-.98 1.213-2.092 1.272-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.282-.292-2.394-1.272-3.374-.98-.98-2.092-1.213-3.374-1.272C15.668.013 15.259 0 12 0z" />
                <circle cx="12" cy="12" r="3.5" />
              </svg>
            </a>
            <a
              href="https://wa.me/9777483509984"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.676.15-.2.301-.776.978-.952 1.179-.176.2-.351.226-.652.075-.301-.15-1.271-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.501.101-.2.05-.376-.025-.526-.075-.15-.676-1.63-.927-2.232-.244-.587-.492-.507-.676-.516-.175-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.052 1.028-1.052 2.508 0 1.48 1.078 2.909 1.228 3.11.15.2 2.122 3.24 5.14 4.544.718.31 1.278.496 1.716.635.721.229 1.377.197 1.895.12.577-.087 1.78-.727 2.03-1.43.25-.702.25-1.304.175-1.43-.075-.125-.276-.2-.577-.35zm-5.452 7.618c-2.17 0-4.202-.58-5.962-1.59l-.427-.247-4.431 1.162 1.183-4.32-.278-.442c-1.121-1.788-1.714-3.87-1.714-6.003 0-6.175 5.025-11.2 11.2-11.2 2.991 0 5.803 1.165 7.918 3.28 2.115 2.116 3.28 4.927 3.28 7.92 0 6.176-5.024 11.2-11.2 11.2z" />
              </svg>
            </a>
            <a
              href="tel:+9777483509984"
              aria-label="Call +977-7483509984"
              className="oz-footer__social-btn"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.43-3.9-6.82-6.82l1.97-1.57c.27-.27.35-.65.24-1.01A11.36 11.36 0 018.64 4c0-.55-.45-1-1-1H4.15c-.55 0-1 .45-1 1 0 9.39 7.63 17.02 17.02 17.02.55 0 1-.45 1-1v-3.64c0-.55-.45-1-1-1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="oz-footer__grid oz-footer__grid--4col">
          {/* Column 1: Quick Links */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot">●</span> Quick Links
            </h4>
            <nav aria-label="Footer Navigation">
              <ul className="oz-footer__nav-list">
                <li>
                  <Link to="/" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> About
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Careers
                  </Link>
                </li>
                <li>
                  <Link to="/partner-program" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Partner Program
                  </Link>
                </li>
                <li>
                  <Link to="/auth" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Partner Login
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="oz-footer__nav-link">
                    <span className="oz-footer__arrow">→</span> Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Column 2: Solutions */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot">●</span> Solutions
            </h4>
            <ul className="oz-footer__nav-list">
              <li>
                <Link to="/services" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> Services
                </Link>
              </li>
              <li>
                <Link to="/products" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> Products
                </Link>
              </li>
              <li>
                <Link to="/industries" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> Industries
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> Portfolio
                </Link>
              </li>
              <li>
                <Link to="/services/crm-solutions" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> CRM Systems
                </Link>
              </li>
              <li>
                <Link to="/services/erp-development" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> ERP Platforms
                </Link>
              </li>
              <li>
                <Link to="/services/lms-platforms" className="oz-footer__nav-link">
                  <span className="oz-footer__arrow">→</span> LMS Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot">●</span> Contact Us
            </h4>
            <div className="oz-footer__contact-items">
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">📍</span>
                <span className="oz-footer__contact-text">
                  Siddharthanagar, Bhairahawa, Rupandehi, Nepal
                </span>
              </div>
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">📞</span>
                <a href="tel:+9777483509984" className="oz-footer__contact-link">
                  +977-7483509984
                </a>
              </div>
              <div className="oz-footer__contact-row">
                <span className="oz-footer__contact-icon">💬</span>
                <a
                  href="https://wa.me/9777483509984"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="oz-footer__contact-link"
                >
                  WhatsApp: +977-7483509984
                </a>
              </div>
            </div>

            <h5 className="oz-footer__sub-title">Office &amp; Support</h5>
            <ul className="oz-footer__hours-list">
              <li className="oz-footer__hours-item">
                <span>Mon – Sun</span>
                <span className="oz-footer__hours-val">24/7 Available</span>
              </li>
              <li className="oz-footer__hours-item">
                <span>Direct Support</span>
                <span className="oz-footer__hours-val">Product Team</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Stay Updated */}
          <div className="oz-footer__col">
            <h4 className="oz-footer__col-title">
              <span className="oz-footer__dot">●</span> Stay Updated
            </h4>
            <p className="oz-footer__newsletter-desc">
              Subscribe to product updates, engineering insights, and tech releases from Ozeonix
              Infinity.
            </p>

            {subscribed ? (
              <div className="oz-footer__subscribed-msg" role="status">
                <span className="oz-footer__subscribed-icon">✓</span> Thank you! You’re on the list.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="oz-footer__form">
                <div className="oz-footer__input-wrap">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    aria-label="Your email address"
                    className="oz-footer__input"
                  />
                  <span className="oz-footer__input-icon" aria-hidden="true">
                    ✉️
                  </span>
                </div>
                <button type="submit" className="oz-btn oz-btn--primary oz-footer__submit-btn">
                  🚀 Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="oz-footer__bottom">
          <p className="oz-footer__copyright">
            © {year} <span className="oz-footer__brand-strong">Ozeonix Infinity</span>. All rights
            reserved.
          </p>
          <div className="oz-footer__legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/refund">Refund Policy</Link>
            <Link to="/cookies">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
