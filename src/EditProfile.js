import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import { useNavigate } from 'react-router-dom';
import { getUserData, updateUserData, uploadAvatar } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

const EditProfile = () => {
    const [user, setUser] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    const userData = await getUserData(currentUser.uid);
                    setUser(userData || {});
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
                console.error("User is not authenticated");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleAvatarChange = (e) => {
        setAvatarFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let avatarUrl = user.avatar;
            if (avatarFile) {
                avatarUrl = await uploadAvatar(avatarFile, auth.currentUser.uid);
            }

            await updateUserData(auth.currentUser.uid, { ...user, avatar: avatarUrl });

            navigate('/profile');
        } catch (error) {
            console.error("Failed to update user profile:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="edit-profile-page">
            <div className="edit-profile-content">
                <form onSubmit={handleSubmit} className="edit-profile-form">
                    <div className="avatar-preview">
                        <img
                            src={user.avatar || '/default-avatar.png'}
                            alt="Avatar"
                            className="round"
                        />
                        <input type="file" onChange={handleAvatarChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Имя пользователя</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={user.username || ''}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Имя пользователя"
                        />
                    </div>
                    <button type="submit" className="primary large">Сохранить</button>
                    <button type="button" className="secondary large" onClick={() => navigate('/profile')}>Отмена</button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
