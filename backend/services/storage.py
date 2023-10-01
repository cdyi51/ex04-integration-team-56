"""Stand-in data layer until we connect to the database.

This file provides some overly simplistic access functions to support the minimum
API of this exercise. Ultimately, functions like these will be backed by an actual
storage system such as a relational database.
"""
from datetime import datetime
from models.user import User
from models.checkin import Checkin


__author__ = "Kris Jordan"
__copyright__ = "Copyright 2023"
__license__ = "MIT"

_registrations: dict[int, User] = {}
"""Private module data simulating a simple key-value store where keys are PID and values are User objects. Do not reference externally."""

_checkins: list[Checkin] = []
"""Private module data simulating a simple append-only store where values are Checkin objects. Do not reference externally."""


class StorageService:
    def reset(self):
        global _registrations, _checkins
        _registrations = {}
        _checkins = []

    def create_registration(self, user: User) -> User:
        """Register a new user.

        Args:
            user is a valid User model.

        Returns:
            The registered User object.

        Raises:
            Exception if a user with the same PID is already registered.
        """
        global _registrations
        if len(str(user.pid)) != 9:
            raise Exception(f"Invalid PID: {user.pid}")

        if len(user.first_name) == 0 or len(user.last_name) == 0:
            raise Exception(f"First and Last Name required.")

        if user.pid in _registrations:
            raise Exception(f"User with PID {user.pid} already registered.")
        _registrations[user.pid] = user
        return user

    def get_registrations(self) -> list[User]:
        """Get a list of all registered users.

        Args:
            None

        Returns:
            List of all registered users.
        """
        global _registrations
        return list(_registrations.values())

    def get_user_by_pid(self, pid: int) -> User | None:
        """Lookup a User by their PID.

        Args:
            pid of the user to lookup.

        Returns:
            None if the user's PID is not registered. Otherwise,
            returns the corresponding User model.
        """
        global _registrations
        return _registrations[pid] if pid in _registrations else None

    def create_checkin(self, pid: int) -> Checkin:
        """Checkin a User by their PID.

        Args:
            pid of the user checking in.

        Returns:
            Checkin object of a successful checkin.

        Raises:
            Exception if user with PID does not exist.
        """
        global _checkins
        user = self.get_user_by_pid(pid)
        if user:
            checkin = Checkin(user=user, created_at=datetime.now())
            _checkins.append(checkin)
            return checkin
        else:
            raise Exception(f"User with PID {pid} does not exist.")

    def get_checkins(self) -> list[Checkin]:
        """Get all checkins in the system.

        Args:
            None

        Returns:
            List of all checkins."""
        global _checkins
        return _checkins
