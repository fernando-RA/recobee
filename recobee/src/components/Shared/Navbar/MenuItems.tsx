import { Button } from '@components/UI/Button'
import { Modal } from '@components/UI/Modal'
import AppContext from '@components/utils/AppContext'
import { Profile } from '@generated/types'
import { Menu, Transition } from '@headlessui/react'
import {
  ArrowCircleRightIcon,
  CogIcon,
  LogoutIcon,
  MoonIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  SunIcon,
  SwitchHorizontalIcon,
  UserIcon
} from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import getAvatar from '@lib/getAvatar'
import isBeta from '@lib/isBeta'
import isStaff from '@lib/isStaff'
import trackEvent from '@lib/trackEvent'
import clsx from 'clsx'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FC, Fragment, useContext, useState } from 'react'
import { CHAIN_ID, GIT_COMMIT_SHA } from 'src/constants'
import { useDisconnect, useNetwork } from 'wagmi'

import Slug from '../Slug'
import Login from './Login'

export const NextLink = ({ href, children, ...rest }: Record<string, any>) => (
  <Link href={href}>
    <a {...rest}>{children}</a>
  </Link>
)

const MenuItems: FC = () => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()
  const { activeChain } = useNetwork()
  const { disconnect } = useDisconnect()

  const {
    staffMode,
    setStaffMode,
    profiles,
    currentUser,
    currentUserLoading,
    setSelectedProfile
  } = useContext(AppContext)

  const toggleStaffMode = () => {
    localStorage.setItem('staffMode', String(!staffMode))
    setStaffMode(!staffMode)
  }

  return currentUserLoading ? (
    <div className="w-8 h-8 rounded-full shimmer" />
  ) : currentUser && activeChain?.id === CHAIN_ID ? (
    <Menu as="div">
      {({ open }) => (
        <>
          <Menu.Button
            as="img"
            src={getAvatar(currentUser)}
            className="w-8 h-8 rounded-full border cursor-pointer dark:border-gray-700/80"
            alt={currentUser?.handle}
          />
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 py-1 mt-2 w-48 bg-white rounded-xl border shadow-sm dark:bg-gray-900 focus:outline-none dark:border-gray-700/80"
            >
              <Menu.Item
                as={NextLink}
                href={`/u/${currentUser?.handle}`}
                className={({ active }: { active: boolean }) =>
                  clsx({ 'bg-gray-100 dark:bg-gray-800': active }, 'menu-item')
                }
              >
                <div>Logged in as</div>
                <div className="truncate">
                  <Slug
                    className="font-bold"
                    slug={currentUser?.handle}
                    prefix="@"
                  />
                </div>
              </Menu.Item>
              <div className="border-b dark:border-gray-700/80" />
              <Menu.Item
                as={NextLink}
                href={`/u/${currentUser?.handle}`}
                className={({ active }: { active: boolean }) =>
                  clsx({ 'bg-gray-100 dark:bg-gray-800': active }, 'menu-item')
                }
              >
                <div className="flex items-center space-x-1.5">
                  <UserIcon className="w-4 h-4" />
                  <div>Your Profile</div>
                </div>
              </Menu.Item>
              <Menu.Item
                as={NextLink}
                href="/settings"
                className={({ active }: { active: boolean }) =>
                  clsx({ 'bg-gray-100 dark:bg-gray-800': active }, 'menu-item')
                }
              >
                <div className="flex items-center space-x-1.5">
                  <CogIcon className="w-4 h-4" />
                  <div>Settings</div>
                </div>
              </Menu.Item>
              <Menu.Item
                as="a"
                onClick={() => {
                  trackEvent('logout')
                  localStorage.removeItem('selectedProfile')
                  localStorage.removeItem('accessToken')
                  localStorage.removeItem('refreshToken')
                  disconnect()
                }}
                className={({ active }: { active: boolean }) =>
                  clsx({ 'bg-gray-100 dark:bg-gray-800': active }, 'menu-item')
                }
              >
                <div className="flex items-center space-x-1.5">
                  <LogoutIcon className="w-4 h-4" />
                  <div>Logout</div>
                </div>
              </Menu.Item>
              {profiles.length > 1 && (
                <>
                  <div className="border-b dark:border-gray-700/80" />
                  <div className="overflow-auto m-2 max-h-36 no-scrollbar">
                    <div className="flex items-center px-4 pt-1 pb-2 space-x-1.5 text-sm font-bold text-gray-500">
                      <SwitchHorizontalIcon className="w-4 h-4" />
                      <div>Switch to</div>
                    </div>
                    {profiles.map((profile: Profile, index: number) => (
                      <div
                        key={profile?.id}
                        className="block text-sm text-gray-700 rounded-lg cursor-pointer dark:text-gray-200"
                      >
                        <button
                          type="button"
                          className="flex items-center py-1.5 px-4 space-x-2 w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => {
                            localStorage.setItem(
                              'selectedProfile',
                              index.toString()
                            )
                            setSelectedProfile(index)
                            trackEvent('switch profile')
                          }}
                        >
                          {currentUser?.id === profile?.id && (
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                          )}
                          <img
                            className="w-5 h-5 rounded-full border dark:border-gray-700/80"
                            src={getAvatar(profile)}
                            alt={profile?.handle}
                          />
                          <div className="truncate">{profile?.handle}</div>
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="border-b dark:border-gray-700/80" />
              <Menu.Item
                as="a"
                onClick={() => {
                  trackEvent(`${theme === 'light' ? 'dark' : 'light'} mode`)
                  setTheme(theme === 'light' ? 'dark' : 'light')
                }}
                className={({ active }: { active: boolean }) =>
                  clsx({ 'bg-gray-100 dark:bg-gray-800': active }, 'menu-item')
                }
              >
                <div className="flex items-center space-x-1.5">
                  {theme === 'light' ? (
                    <>
                      <MoonIcon className="w-4 h-4" />
                      <div>Dark mode</div>
                    </>
                  ) : (
                    <>
                      <SunIcon className="w-4 h-4" />
                      <div>Light mode</div>
                    </>
                  )}
                </div>
              </Menu.Item>
              {currentUser && isBeta(currentUser) && GIT_COMMIT_SHA && (
                <>
                  <div className="border-b dark:border-gray-700/80" />
                  <div className="py-3 px-6 text-xs">
                    <a
                      href={`https://gitlab.com/lenster/lenster/-/commit/${GIT_COMMIT_SHA}`}
                      className="font-mono"
                      title="Git commit SHA"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      fc4a59ea (beta)
                    </a>
                  </div>
                </>
              )}
              {isStaff(currentUser?.id) && (
                <>
                  <div className="border-b dark:border-gray-700/80" />
                  <Menu.Item
                    as="div"
                    onClick={toggleStaffMode}
                    className={({ active }: { active: boolean }) =>
                      clsx(
                        { 'bg-yellow-100 dark:bg-yellow-800': active },
                        'menu-item'
                      )
                    }
                  >
                    {staffMode ? (
                      <div className="flex items-center space-x-1.5">
                        <div>Disable staff mode</div>
                        <ShieldExclamationIcon className="w-4 h-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1.5">
                        <div>Enable staff mode</div>
                        <ShieldCheckIcon className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  ) : (
    <>
      <Modal
        title="Login"
        icon={<ArrowCircleRightIcon className="w-5 h-5 text-brand" />}
        show={showLoginModal}
        onClose={() => setShowLoginModal(!showLoginModal)}
      >
        <Login />
      </Modal>
      <Button
        icon={
          <img
            className="mr-0.5 h-4"
            src="/eth-white.svg"
            alt="Ethereum Logo"
          />
        }
        onClick={() => {
          trackEvent('login')
          setShowLoginModal(!showLoginModal)
        }}
      >
        Login
      </Button>
    </>
  )
}

export default MenuItems