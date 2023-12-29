<?php

// src/Security/UserProvider.php
namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use PHPUnit\Util\Exception;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserProvider implements UserProviderInterface, PasswordUpgraderInterface
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    /**
     * Symfony calls this method if you use features like switch_user
     * or remember_me. If you're not using these features, you do not
     * need to implement this method.
     *
     * @throws UserNotFoundException if the user is not found
     */
    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        $user = $this->userRepository->findOneBy(['email' => $identifier]);
        if($user) {
            if($user->getIsActive()) {
                return $user;
            }

            $e = New CustomUserMessageAccountStatusException(sprintf('User "%s" not active.', $identifier), [], Response::HTTP_FORBIDDEN);
            $e->setUser($user);
            Throw $e;
        }

        $e = new UserNotFoundException(sprintf('User "%s" not found.', $identifier));
        $e->setUserIdentifier($identifier);

        throw $e;
    }

    /**
     * Refreshes the user after being reloaded from the session.
     *
     * When a user is logged in, at the beginning of each request, the
     * User object is loaded from the session and then this method is
     * called. Your job is to make sure the user's data is still fresh by,
     * for example, re-querying for fresh User data.
     *
     * If your firewall is "stateless: true" (for a pure API), this
     * method is not called.
     */
    public function refreshUser(UserInterface $user): UserInterface
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Invalid user class "%s".', get_class($user)));
        }

        // Return a User object after making sure its data is "fresh".
        // Or throw a UserNotFoundException if the user no longer exists.
        throw new \Exception('TODO: fill in refreshUser() inside '.__FILE__);
    }

    /**
     * Tells Symfony to use this provider for this User class.
     */
    public function supportsClass(string $class): bool
    {
        return User::class === $class || is_subclass_of($class, User::class);
    }

    public function loadUserByUsername(string $username)
    {
        if($user = $this->userRepository->findOneBy(['email' => $username, 'isActive' => true])) {
            return $user;
        }

        $e = new UserNotFoundException(sprintf('User "%s" not found.', $username));
        $e->setUserIdentifier($username);

        throw $e;
    }
}
