import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';

// context e token
// import loginService from 'services/eduzzAccounts/loginService';
// import { useStateValue } from 'store/TokenProvider';
// import { Context } from 'context/intl';
// import jwt from 'jsonwebtoken';

// Material UI / Icons
import { motion } from 'framer-motion';
import { Menu } from '@material-ui/core';
import Avatar from '@eduzz/houston-ui/Avatar';
import Button from '@eduzz/houston-ui/Button';
import ButtonIcon from '@eduzz/houston-ui/ButtonIcon';
import Typography from '@eduzz/houston-ui/Typography';
import { FaRegWindowClose, FaSignOutAlt } from 'react-icons/fa';
import Apps from '@eduzz/houston-icons/Apps';
import Enter from '@eduzz/houston-icons/Enter';

//utils

import {
	Billing,
	Blinket,
	CheckoutSun,
	Eduzz,
	Jobzz,
	LogoEduzz,
	Nutror,
	Orbita,
	OrbitPages,
	SafeVideo,
	Telescope,
} from 'assets';

interface ObjOptions {
	title: string;
	path: string;
}

const variants = {
	open: { opacity: 1 },
	closed: { opacity: 0, x: '-100%' },
};

function Navbar() {
	// const history = useHistory();
	const location = useLocation();
	//   const { t, i18n } = useTranslation('common');
	//   const context = useContext(Context);
	const [language, setLanguage] = useState<string | null>('br');
	const [showNavbar, setShowNavbar] = useState<boolean>(false);
	const [storeNavbar, setStoreNavbar] = useState<any>({
		name: 'Loja',
		icon: LogoEduzz,
		url: '/',
	});
	const [options, setOptions] = useState<ObjOptions[]>([]);
	const [menuDropdownType, setMenuDropdownType] = useState<number>(1);
	//   const [{ token }, dispatch] = useStateValue();
	//   const tokenUser = token ? token.split(' ')[1] : '';
	//   const user: any = jwt.decode(tokenUser);
	const [isOpen, setIsOpen] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [anchorElApps, setAnchorElApps] = useState<null | HTMLElement>(null);

	const InitialApps = [
		{ name: 'Loja de Apps', icon: Eduzz, url: '/' },
		{ name: 'Blinket', icon: Blinket, url: 'https://app.blinket.com.br' },
		{
			name: 'Checkout Sun',
			icon: CheckoutSun,
			url: 'https://adminsun.eduzz.com/',
		},
		{ name: 'Jobzz', icon: Jobzz, url: 'https://app.jobzz.com.br' },
		{ name: 'Orbita', icon: Orbita, url: 'https://orbita.eduzz.com/' },
		{ name: 'Nutror', icon: Nutror, url: 'https://my.nutror.com/' },
		{
			name: 'Orbit Pages',
			icon: OrbitPages,
			url: 'https://app.orbitpages.com/',
		},
		{
			name: 'Telescope',
			icon: Telescope,
			url: 'https://telescope.eduzz.com/',
		},
		{
			name: 'Safe Vídeo',
			icon: SafeVideo,
			url: 'https://app.safevideo.com/',
		},
	];
	const [apps, setApps] = useState<any>(InitialApps);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (Boolean(anchorEl)) return handleClose();
		setAnchorEl(event.currentTarget);
		setTimeout(() => {
			document.getElementById('dropdown-menu')?.focus();
		}, 100);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleClickApps = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (Boolean(anchorElApps)) return handleCloseApps();
		setAnchorElApps(event.currentTarget);
		setTimeout(() => {
			document.getElementById('dropdown-menu-apps')?.focus();
		}, 100);
	};

	const handleCloseApps = () => {
		setAnchorElApps(null);
	};

	//   const AuthorizationNavbar = users => {
	//     if (!token) {
	//       setOptions([]);
	//     } else {
	//       if (typeof users.role === 'string') {
	//         if (users.role === 'LojaAppIsEmployee') {
	//           setMenuDropdownType(1);
	//           setOptions([
	//             {
	//               title: `${t('navbar.painel-de-controle')}`,
	//               path: '/dashboard'
	//             }
	//           ]);
	//         } else if (users.role === 'LojaAppIsPartner') {
	//           setMenuDropdownType(2);
	//           setOptions([
	//             {
	//               title: `${t('navbar.painel-de-controle')}`,
	//               path: '/dashboard'
	//             }
	//           ]);
	//         } else {
	//           setOptions([]);
	//         }
	//       } else {
	//         users.role.some(billingAdmin => billingAdmin === 'BillingAdmin') &&
	//           setApps([{ name: 'Billing', icon: Billing, url: '/billing' }, ...InitialApps]);
	//         users.role.some(usersAdmin => usersAdmin === 'UsersAdmin')
	//           ? setOptions([
	//               {
	//                 title: `${t('navbar.painel-de-controle')}`,
	//                 path: '/dashboard'
	//               },
	//               {
	//                 title: `${t('dashboard.usuarios')}`,
	//                 path: '/users'
	//               }
	//             ])
	//           : setOptions([
	//               {
	//                 title: `${t('navbar.painel-de-controle')}`,
	//                 path: '/dashboard'
	//               }
	//             ]);
	//       }
	//     }
	//   };

	//   useEffect(() => {
	//     if (localStorage.getItem('language')) {
	//       setLanguage(localStorage.getItem('language'));
	//       if (localStorage.getItem('language') === 'br') {
	//         i18n.changeLanguage('pt');
	//       } else {
	//         i18n.changeLanguage('en');
	//       }
	//     }
	//     location.pathname === '/not-found' || location.pathname === '/login' ? setShowNavbar(false) : setShowNavbar(true);
	//     if (location.pathname.includes('billing')) {
	//       setStoreNavbar({ name: 'Billing', icon: Billing, url: '/billing' });
	//     } else {
	//       setStoreNavbar({ name: t('navbar.loja'), icon: LogoEduzz, url: '/' });
	//     }
	//   }, [location.pathname]);

	//   useEffect(() => {
	//     const tokenUser = token ? token.split(' ')[1] : '';
	//     AuthorizationNavbar(jwt.decode(tokenUser));
	//   }, [token]);

	//   const logout = (): void => {
	//     localStorage.removeItem('logado');
	//     dispatch({
	//       type: 'REMOVE_TOKEN',
	//       token: null
	//     });
	//     history.push('/');
	//     setTimeout(() => loginService.logout(), 100);
	//   };

	//   const selectLanguage = (flag: any, e: any) => {
	//     const div = document.querySelector<HTMLElement>('.selected-lang');
	//     if (flag === 'br') {
	//       div?.classList.add('br');
	//       div?.classList.remove('en');
	//       i18n.changeLanguage('pt');
	//       localStorage.setItem('language', 'br');
	//     } else {
	//       div?.classList.add('en');
	//       div?.classList.remove('br');
	//       i18n.changeLanguage('en');
	//       localStorage.setItem('language', 'en');
	//     }
	//     context.selectLang(e);
	//     const tokenUser = token ? token.split('Bearer')[1].trim('') : '';
	//     AuthorizationNavbar(jwt.decode(tokenUser));
	//     if (location.pathname.includes('billing')) {
	//       setStoreNavbar({ name: 'Billing', icon: Billing, url: '/billing' });
	//     } else {
	//       setStoreNavbar({ name: t('navbar.loja'), icon: LogoEduzz, url: '/' });
	//     }
	//   };

	return (
		<>
			{showNavbar ? (
				<header>
					<nav className="navbar">
						<div className="navbar-home">
							<img src={LogoEduzz} alt="Logo da Eduzz" />
							<span>eduzz</span>
						</div>
						<div className="navbar-links">
							{/* <div className='lang-menu'>
                <div className={`selected-lang ${language}`}></div>
                <ul>
                  <li>
                    <span className='en' onClick={() => selectLanguage('en', 'en-US')}></span>
                  </li>
                  <li>
                    <span className='br' onClick={() => selectLanguage('br', 'pt-BR')}></span>
                  </li>
                </ul>
              </div> */}
							{/* {token && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                  <Button
                    className='btn-menu-apps'
                    onClick={handleClickApps}
                    aria-controls='simple-menu-apps'
                    aria-haspopup='true'
                  >
                    <Apps />
                    <Typography size='x-small' fontWeight='semibold'>
                      Apps
                    </Typography>
                  </Button>
                  <Menu
                    id='simple-menu-apps'
                    elevation={4}
                    anchorEl={anchorElApps}
                    keepMounted={true}
                    open={Boolean(anchorElApps)}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                    onClose={handleCloseApps}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '8px',
                        padding: '8px'
                      }}
                      id='dropdown-menu-apps'
                    >
                      {apps.map(({ name, icon, url }) => (
                        <ButtonIcon
                          key={url}
                          className='btn-apps'
                          size='small'
                          onClick={() => {
                            if (name === 'Billing' || name === 'Loja de Apps') {
                              history.push(url);
                            } else {
                              window.open(url);
                            }
                            handleCloseApps();
                          }}
                        >
                          <img src={icon} alt={name} />
                          <Typography size='x-small' fontWeight='regular'>
                            {name}
                          </Typography>
                        </ButtonIcon>
                      ))}
                    </div>
                  </Menu>
                </div>
              )} */}
							{/* {!token && ( */}
							<Button
								className="login"
								startIcon={<Enter />}
								variant="text"
								// onClick={() => history.push('/login')}
							>
								<Typography
									size="x-small"
									fontWeight="semibold"
								>
									Login
								</Typography>
							</Button>
							{/* )} */}
							{/* {token && (
                <div className='user-menu' style={{ position: 'relative' }}>
                  <ButtonIcon size={'small'} onClick={handleClick} aria-controls='simple-menu' aria-haspopup='true'>
                    <Avatar className='navbar-avatar' type='text'>
                      {user.Nome[0]}
                    </Avatar>
                  </ButtonIcon>
                  {Boolean(anchorEl) && (
                    <span
                      style={{
                        width: '15px',
                        height: '15px',
                        position: 'absolute',
                        borderLeft: '10px solid transparent',
                        borderRight: '10px solid transparent',
                        borderBottom: '10px solid #fff',
                        top: '25px',
                        right: '10px'
                      }}
                    ></span>
                  )}
                  <Menu
                    id='simple-menu'
                    elevation={4}
                    anchorEl={anchorEl}
                    keepMounted={true}
                    anchorReference='anchorPosition'
                    open={Boolean(anchorEl)}
                    anchorPosition={{ top: 45, left: 1590 }}
                    onClose={handleClose}
                  >
                    <div
                      style={{
                        minWidth: '300px',
                        height: '128px',
                        position: 'relative'
                      }}
                      id='dropdown-menu'
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 4fr',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '12px',
                          marginBottom: '28px',
                          marginLeft: '16px'
                        }}
                      >
                        <Avatar className='menu-avatar' size='small' type='text' filled>
                          {user.Nome[0]}
                        </Avatar>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          <span style={{ color: '#37474F' }}>{user.Nome}</span>
                          <span style={{ color: '#546E7A' }}>{user.Email}</span>
                        </div>
                      </div>
                      <hr style={{ width: '100%' }} />
                      <div className='user-log-out' onClick={logout}>
                        <FaSignOutAlt fontSize={20} />
                        <span>{t('navbar.sair')}</span>
                      </div>
                    </div>
                  </Menu>
                </div>
              )} */}
						</div>
					</nav>

					<div className="navbar-loja">
						<div className="navbar-home">
							<img src={storeNavbar.icon} alt="Logo da Eduzz" />
							{/* <div onClick={() => history.push(storeNavbar.url)}> */}
							<div>{storeNavbar.name}</div>
						</div>
						<div
							className="navbar-button-toogle"
							id="navbar-button-toogle"
						>
							<button
								aria-controls="navbar-toogle-options"
								aria-label="navbar-toogle-options"
								onClick={() => setIsOpen(!isOpen)}
							>
								<span className="navbar-toggler-icon"></span>
							</button>
						</div>
						<motion.div
							className="navbar-toogle-options"
							initial="hidden"
							id="navbar-toogle-options"
							animate={isOpen ? 'open' : 'closed'}
							variants={variants}
							style={
								isOpen === false
									? { display: 'none' }
									: { display: 'block' }
							}
							transition={{
								type: 'spring',
								damping: 20,
								stiffness: 100,
							}}
						>
							{options.length > 0 && (
								<div className="navbar-links-toogle">
									{options.length > 0 &&
										storeNavbar.name !== 'Billing' &&
										options?.map(({ title, path }) => (
											<Link
												to={`${path}`}
												key={path}
												onClick={() => setIsOpen(false)}
											>
												<Typography
													fontWeight="semibold"
													size="small"
												>
													{title}
												</Typography>
											</Link>
										))}
								</div>
							)}
							<div className="close-navbar">
								<ButtonIcon
									aria-label="navbar"
									onClick={() => setIsOpen(false)}
								>
									<FaRegWindowClose size="28px" />
								</ButtonIcon>
							</div>
						</motion.div>
						{options.length > 0 && (
							<div className="navbar-links">
								{options.length > 0 &&
									storeNavbar.name !== 'Billing' &&
									options?.map(({ title, path }) => (
										<Link to={`${path}`} key={path}>
											<Typography
												fontWeight="semibold"
												size="small"
											>
												{title}
											</Typography>
										</Link>
									))}
							</div>
						)}
					</div>
				</header>
			) : (
				<span></span>
			)}
		</>
	);
}

export default Navbar;
