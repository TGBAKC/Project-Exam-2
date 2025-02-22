import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Input,
  RegisterLink,
  RegisterText,
  Subtitle,
  Title,
} from "../../styled-components/Login/LoginPage.styles";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // Kullanıcı giriş bilgilerini güncelle
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // API Key oluşturma fonksiyonu
  const createApiKey = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("❌ API Key oluşturulamadı: Kullanıcı giriş yapmamış.");
        return;
      }

      const response = await fetch("https://v2.api.noroff.dev/auth/create-api-key", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "My API Key Name" }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API Key oluşturulamadı.");
      }

      console.log("✅ API Key oluşturuldu:", data.data.key);
      localStorage.setItem("apiKey", data.data.key);
    } catch (error) {
      console.error("❌ API Key oluşturma hatası:", error.message);
    }
  };

  // Kullanıcı giriş yapma fonksiyonu
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Kullanıcı giriş yaptıysa token'ı kaydet
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("authToken", data.data.accessToken);
      window.dispatchEvent(new Event("storage"));

      // 📌 API Key’i kontrol et, eğer yoksa oluştur
      if (!localStorage.getItem("apiKey")) {
        await createApiKey();
      }

      // Kullanıcıyı yönlendir
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.message);
      alert(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Welcome Back!</Title>
        <Subtitle>Please login to continue</Subtitle>

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button type="submit">Login</Button>

        <RegisterText>
          Don't have an account?{" "}
          <RegisterLink onClick={() => navigate("/register")}>
            Register here
          </RegisterLink>
        </RegisterText>
      </Form>
    </Container>
  );
};

export default LoginPage;
