"""Tests for the mock storage layer."""

from services.storage import StorageService
from models.user import User
import pytest


@pytest.fixture(autouse=True)
def storage_service():
    """This PyTest fixture is injected into each test parameter of the same name below.

    It constructs a new, empty StorageService object."""
    storage_service = StorageService()
    storage_service.reset()
    return storage_service


def test_get_registrations_empty(storage_service: StorageService):
    assert len(storage_service.get_registrations()) == 0


def test_create_registration_valid(storage_service: StorageService):
    pid = 710453084
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    storage_service.create_registration(user)
    users = storage_service.get_registrations()
    assert len(users) == 1
    assert users[0].pid == pid


def test_create_registration_invalid_pid(storage_service: StorageService):
    pid = 71045308
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    with pytest.raises(Exception):
        storage_service.create_registration(user)


def test_create_registration_missing_first_name(storage_service: StorageService):
    pid = 71045308
    user = User(pid=pid, first_name="", last_name="Jordan")
    with pytest.raises(Exception):
        storage_service.create_registration(user)


def test_create_registration_missing_last_name(storage_service: StorageService):
    pid = 71045308
    user = User(pid=pid, first_name="Kris", last_name="")
    with pytest.raises(Exception):
        storage_service.create_registration(user)


def test_create_registration_duplicate(storage_service: StorageService):
    pid = 710453084
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    storage_service.create_registration(user)
    with pytest.raises(Exception):
        storage_service.create_registration(user)


def test_get_user_by_pid_does_not_exist(storage_service: StorageService):
    assert storage_service.get_user_by_pid(710453084) is None


def test_get_user_by_pid_does_exist(storage_service: StorageService):
    pid = 710453084
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    storage_service.create_registration(user)
    assert storage_service.get_user_by_pid(710453084) is user


def test_create_checkin_unknown_pid(storage_service: StorageService):
    with pytest.raises(Exception):
        storage_service.create_checkin(710453084)


def test_create_checkin_produces_checkin(storage_service: StorageService):
    pid = 710453084
    user = User(pid=pid, first_name="Kris", last_name="Jordan")
    storage_service.create_registration(user)
    storage_service.create_checkin(pid)
    checkins = storage_service.get_checkins()
    assert len(checkins) == 1
    assert checkins[0].user == user
