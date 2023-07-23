interface iParametros {
    title: string | null;
}

export default function IconeScrollCima({ title }: iParametros) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            role='img'
            viewBox='-22 0 157 157'
            fill='none'
            className='svgSemEfeito'
        >
            <g>
                <path
                    d='M107.516 125.524C110.908 113.824 112.346 101.645 111.773 89.4761C111.542 85.6346 110.63 81.8639 109.082 78.3407C108.447 76.8574 107.492 75.5329 106.284 74.4631C105.077 73.3926 103.648 72.603 102.099 72.1514C100.417 71.6605 98.6484 71.5437 96.917 71.8075C95.1849 72.0714 93.531 72.7106 92.0719 73.6801C91.7267 73.9052 91.3893 74.1428 91.0389 74.3896L90.8498 74.5208C89.9244 72.5151 88.5454 70.7521 86.8212 69.3712C85.097 67.9903 83.0749 67.03 80.9155 66.5654C79.0771 66.2164 77.1823 66.3179 75.3924 66.8607C73.6019 67.4035 71.9696 68.3722 70.6353 69.683C69.1191 67.3359 67.072 64.9344 63.5467 64.2203C60.1442 63.535 57.4585 65.1949 54.8614 66.8029L54.8377 66.818C54.7502 65.5054 54.6667 64.2145 54.5871 62.9456C54.3849 59.7296 54.1932 56.696 53.8907 53.6335C53.7778 52.4959 53.6684 51.3562 53.5625 50.2147C53.0512 44.8504 52.5223 39.3031 51.5477 33.9224C51.0226 31.0155 49.7243 27.8585 47.5859 24.2742C46.3389 22.1818 44.7144 20.9269 42.7618 20.5475C40.9083 20.1852 38.8028 20.6683 36.673 21.9416C35.5717 22.5959 34.6125 23.4642 33.8522 24.4952C33.0918 25.5261 32.5457 26.699 32.246 27.9445C31.8181 29.4782 31.5418 31.0502 31.4211 32.6379C31.3533 33.7134 31.283 34.7894 31.2108 35.8658C30.9293 40.0992 30.6392 44.4763 30.6465 48.7871C30.6602 57.5381 30.7994 66.4741 30.9346 75.1168C30.9879 78.5297 31.0393 81.9552 31.0887 85.3931C30.9887 85.3327 30.892 85.2664 30.7987 85.1962C30.6484 85.0767 30.5065 84.9448 30.3641 84.8129C30.1778 84.6324 29.9806 84.463 29.7735 84.3068C23.0565 79.4532 15.9248 77.7559 8.56331 79.2629C6.98725 79.551 5.50812 80.2283 4.26027 81.2338C3.01242 82.2387 2.03524 83.5396 1.41764 85.0176C0.800738 86.5594 0.578595 88.2304 0.770913 89.8798C0.96323 91.5292 1.56407 93.1037 2.51912 94.4623C3.30486 95.544 4.20735 96.5364 5.21017 97.4204C5.78578 97.9672 6.38098 98.5329 6.90934 99.1269C7.86169 100.193 8.86116 101.254 9.82795 102.277C12.3568 104.816 14.6679 107.563 16.7362 110.489C18.8279 113.789 20.7247 117.208 22.4172 120.728C23.3656 122.606 24.3461 124.548 25.3746 126.421L25.6012 126.834C28.0756 131.341 30.6339 136.001 33.4391 140.409C34.8328 142.485 36.5615 144.314 38.5545 145.824C42.5821 148.938 47.0663 151.412 51.8483 153.159C56.6175 155.001 61.6868 155.944 66.7996 155.939C72.6811 155.884 78.5041 154.771 83.9918 152.653C87.7421 151.252 91.1793 148.812 94.6625 146.22C100.657 141.756 104.744 135.181 107.516 125.524ZM36.8442 68.2003C36.8055 66.5594 36.7268 64.8983 36.6474 63.2889C36.5161 60.489 36.3775 57.5932 36.4503 54.7565C36.6571 46.4722 37.1113 38.3875 37.5274 31.5714C37.7532 27.871 38.3749 26.9416 41.6376 25.6276C43.7096 27.0407 44.9698 29.2676 45.6006 32.6189C46.4704 37.1178 47.0718 41.6644 47.402 46.2346C47.8844 53.3697 48.241 60.6347 48.5836 67.6601C48.7341 70.7114 48.8871 73.7614 49.0428 76.8114C49.1295 78.4713 49.5103 80.2342 51.6775 80.7311C53.7837 81.2135 54.8989 79.5103 55.7088 77.7776C55.8873 77.3949 56.0645 77.0097 56.2404 76.6231C57.048 74.6711 58.0648 72.8124 59.2728 71.0796C60.3229 69.6948 61.6479 69.0201 62.916 69.2314C64.2109 69.446 65.2788 70.5441 65.8394 72.246C66.2411 73.6945 66.4564 75.1883 66.48 76.6913C66.5082 77.1711 66.5365 77.6502 66.5758 78.1235C66.5936 78.5212 66.5745 78.9189 66.5207 79.3134C66.4052 79.9409 66.4275 80.586 66.5863 81.2043C66.965 82.1829 67.7074 82.9764 68.6584 83.4201C68.9491 83.5461 69.2616 83.6124 69.5786 83.615C69.8949 83.6183 70.2093 83.5579 70.502 83.4372C70.8125 83.2954 71.0914 83.0926 71.3225 82.8412C71.5535 82.5892 71.7314 82.2945 71.8469 81.9729C72.0261 81.4806 72.1685 80.9766 72.2735 80.4633C72.37 79.9907 72.4993 79.5261 72.6614 79.0719C72.815 78.6728 72.9646 78.2711 73.1149 77.8688C73.6557 76.2844 74.3265 74.7479 75.1207 73.2744C76.2496 71.3212 77.5951 70.8125 79.9198 71.4557C82.8904 72.2781 84.757 74.1401 85.3162 76.841C85.5991 78.428 85.7593 80.0347 85.796 81.6467C85.8203 82.1455 85.8446 82.6443 85.8754 83.1405C85.9713 84.6698 86.3388 86.3021 88.3341 86.8088C90.2933 87.3069 91.3349 86.0632 92.1723 84.6481C92.3692 84.3127 92.5662 83.9747 92.7631 83.6354C93.3761 82.5137 94.0633 81.4347 94.8207 80.4055C96.3467 78.4365 98.168 77.4435 99.8148 77.6824C101.381 77.9115 102.699 79.2176 103.525 81.3579C104.93 84.7354 105.759 88.3243 105.978 91.9761C106.31 101.945 105.05 111.903 102.245 121.474C100.82 126.393 98.6629 131.07 95.8478 135.349C92.5432 140.294 87.322 143.816 79.885 146.121C67.0097 150.11 54.9007 147.943 42.874 139.496C41.6943 138.71 40.6646 137.719 39.8333 136.57C37.7922 133.633 35.9026 130.594 34.1717 127.464C31.5201 122.542 28.936 117.441 26.2713 111.875C22.2184 103.413 17.0886 96.8363 10.5849 91.7681C10.419 91.6414 10.2622 91.5036 10.1157 91.3552C9.9411 91.1734 9.761 90.9936 9.58116 90.8131C8.26849 89.5004 7.02755 88.2534 7.79612 86.2509C8.62114 84.0974 10.7627 83.8881 12.8853 83.8572H13.0981C19.6378 83.8572 29.1264 88.0663 30.275 96.1307C30.5756 98.2461 31.7884 99.4557 33.6032 99.4557H33.6471C35.4428 99.4367 36.6363 98.3078 37.0983 96.1911C37.2899 95.2906 37.3761 94.3705 37.355 93.4503C37.1765 83.2416 37.0155 75.4548 36.8442 68.2003Z'
                    fill='var(--preto)'
                />

                <path
                    d='M19.7533 10.6791L20.782 11.9182C22.1656 13.5873 23.5386 15.2419 24.9287 16.8788C25.6425 17.7705 26.4391 18.5927 27.3079 19.3342C27.6248 19.6151 27.994 19.8305 28.3946 19.9678C28.7952 20.1052 29.2194 20.1617 29.6419 20.1343C29.9323 20.0952 30.2114 19.9968 30.462 19.8452C30.7127 19.6936 30.9294 19.4919 31.0989 19.2528C31.413 18.7658 31.6195 18.2173 31.7045 17.6439C31.7895 17.0706 31.7511 16.4858 31.5917 15.9285C31.0612 14.7102 30.3064 13.6025 29.3666 12.6632L29.2532 12.5319C27.1529 10.1376 24.9832 7.73541 22.8869 5.41261C22.0844 4.52393 21.2826 3.63504 20.4814 2.74592C19.1307 1.24422 18.1059 0.602997 17.0571 0.601685H17.0539C16.0477 0.601685 15.0587 1.19764 13.8504 2.53328C10.3653 6.38664 6.97922 10.4421 3.70345 14.3631C2.86202 15.3717 2.01925 16.3794 1.1752 17.3862C0.89629 17.6791 0.678146 18.0242 0.533281 18.4018C0.388417 18.7794 0.319615 19.182 0.33106 19.5862C0.36418 19.8938 0.459397 20.1915 0.611157 20.461C0.762918 20.7306 0.968192 20.9664 1.21398 21.1542C2.36191 22.1151 3.7697 21.9254 4.9767 20.6495C5.78597 19.7963 6.56962 18.8925 7.32898 18.0202C7.88359 17.3816 8.43957 16.7423 9.00862 16.1168C9.37223 15.7171 9.73053 15.3082 10.0909 14.8901C11.0189 13.7869 12.0062 12.7353 13.0489 11.7397C13.0489 11.9648 13.049 12.1709 13.0457 12.3626C13.0417 13.0544 13.0383 13.5565 13.0527 14.0579L13.2268 20.2872C13.4112 26.9635 13.6022 33.8668 13.8549 40.6547C13.9501 42.5804 14.2537 44.4901 14.7606 46.3504C14.9218 46.9893 15.2988 47.5527 15.8281 47.9452C16.3573 48.3376 17.0063 48.535 17.6644 48.5038C17.7642 48.5038 17.8612 48.4999 17.9669 48.492C18.6729 48.4725 19.3462 48.1908 19.8558 47.7018C20.3654 47.2128 20.6747 46.5516 20.7233 45.847C20.8893 44.7174 20.947 43.5745 20.8955 42.434C20.7642 40.2208 20.6113 38.0083 20.4571 35.7965C20.2011 32.1374 19.9364 28.3529 19.7946 24.6295C19.6673 21.2743 19.6971 17.9657 19.7292 14.4629C19.7378 13.2145 19.7493 11.957 19.7533 10.6791Z'
                    fill='var(--preto)'
                />
            </g>

            <defs>
                <clipPath>
                    <rect
                        width='112.234'
                        height='155.552'
                        transform='translate(0.19519 0.602173)'
                    />
                </clipPath>
            </defs>

            <title>{title}</title>
        </svg>
    )
}