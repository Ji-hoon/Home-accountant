import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
import { CustomError } from "../middleware/errorHandler.js";

const kakaoGetUserInfoURL = "https://kapi.kakao.com/v2/user/me";
const kakaoGetTokenURL = "https://kauth.kakao.com/oauth/token";

// 인증 관련 서비스 로직
const authService = {
  // 인가 코드 검증하는 함수
  async validateKakaoOAuthCode(code: string) {
    if (typeof code === "undefined") {
      throw new CustomError({
        status: 400,
        message: "Authorized Code가 존재하지 않습니다.",
      });
    }
    return code;
  },
  // 인가 코드를 사용하여 카카오 액세스 토큰을 발급받아 리턴하는 함수
  async getKakaoAccessToken(code: string): Promise<{ accessToken: string }> {
    const REST_API_KEY: string | undefined = process.env
      .KAKAO_REST_API_KEY as string;
    const BACKEND_URL: string | undefined = process.env.BACKEND_URL as string;

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const data = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: `${BACKEND_URL}/api/auth/oauth`,
      code: code,
    };

    try {
      const response = await fetch(kakaoGetTokenURL, {
        method: "POST",
        headers: headers,
        body: new URLSearchParams(data),
      });
      const result = await response.json();
      return { accessToken: result.access_token };
    } catch (error) {
      throw new CustomError({
        status: 500,
        message: "엑세스 토큰 발급에 실패했습니다.",
      });
    }
  },
  // 발급된 액세스 토큰으로 유저 정보를 반환하는 함수
  // 응답 형태 - { id: 3221581180, connected_at: '2023-12-17T06:50:59Z' }
  async getUserInfo(accessToken: string) {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization: "Bearer " + accessToken,
    };

    try {
      const response = await fetch(kakaoGetUserInfoURL, { headers });
      const result = await response.json();

      return result;
    } catch (error) {
      throw new CustomError({
        status: 500,
        message: "카카오 회원 정보 조회에 실패했습니다.",
      });
    }
  },
  // JWT 토큰 생성하고 반환하는 함수
  generateJWT(userId: string, nickname: string): string {
    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 현재시간 + @, e.g. 60*60 = 1시간 후 만료
    const payload = {
      user_id: userId,
      nickname: nickname,
      exp: expirationTime,
    };

    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign(payload, secretKey);

    return token;
  },
  extractDataFromToken(userToken: string, key: string) {
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const jwtDecoded = jwt.verify(userToken, secretKey) as JwtPayload;

    return jwtDecoded[key];
  },
  async handleAuthUser(
    userInfo: {
      id: string;
      properties: {
        nickname: string;
        profile_image: string;
      };
    },
    api: string,
  ) {
    const data = {
      snsId: userInfo.id,
      nickname: userInfo.properties.nickname,
      profileImgUrl: userInfo.properties.profile_image,
    };

    const response = await fetch(`${process.env.BACKEND_URL}/api/auth/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!result) {
      throw new CustomError({
        status: 500,
        message:
          api && "join"
            ? "회원 가입에 실패했습니다."
            : "로그인에 실패했습니다.",
      });
    }
    return result;
  },
};

export default authService;
