export const AvatarConfig = [
    {
        color: '#f56a00',
        backgroundColor: '#fde3cf',
        bannerColor: 'linear-gradient(132deg, #F4D03F 0%, #16A085 100%)'
    },{
        color: '#ffffff',
        backgroundColor: '#87d068', // xanh lá đậm
        bannerColor: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)'
        
    }, {
        color: '#30a800',
        backgroundColor: '#cffdd1', // xanh lợt,
        bannerColor: 'radial-gradient( circle 506px at 50.6% 16.5%,  rgba(239,252,250,1) 5.5%, rgba(154,192,206,1) 100.2% )'
    }
];

export const getAvatarConfig = () => {
    return AvatarConfig[Math.floor(Math.random() * AvatarConfig.length)];
}