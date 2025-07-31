/**
 * 获取当前URL的查询参数
 * @param paramName 可选参数名，如果提供则返回指定参数的值，否则返回所有参数的键值对
 * @param url 可选URL字符串，默认为当前页面的URL
 * @returns 如果提供了paramName则返回对应的值(string | null)，否则返回包含所有参数的对象
 */
export function getQueryParam(paramName?: string, url: string = window.location.href): string | null | Record<string, string> {
  try {
    const searchParams = new URL(url).searchParams;

    if (paramName) {
      // 返回指定参数的值
      return searchParams.get(paramName);
    }

    // 返回所有参数的键值对
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch (error) {
    console.error("Error parsing URL:", error);
    return paramName ? null : {};
  }
}

/**
 * 获取当前URL的哈希部分的查询参数
 * @param paramName 可选参数名
 * @param hash 可选hash字符串，默认为当前页面的hash
 * @returns 如果提供了paramName则返回对应的值(string | null)，否则返回包含所有参数的对象
 */
export function getHashParam(paramName?: string, hash: string = window.location.hash): string | null | Record<string, string> {
  try {
    // 移除#号并获取hash部分
    const hashPart = hash.split("?")[1] || "";
    const searchParams = new URLSearchParams(hashPart);

    if (paramName) {
      return searchParams.get(paramName);
    }

    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  } catch (error) {
    console.error("Error parsing hash parameters:", error);
    return paramName ? null : {};
  }
}

/**
 * 获取当前URL的所有查询参数（包括hash和search部分）
 * @returns 包含所有查询参数的对象
 */
export function getAllQueryParams(): Record<string, string> {
  const searchParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams(window.location.hash.split("?")[1] || "");

  const params: Record<string, string> = {};

  // 添加search部分的参数
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  // 添加hash部分的参数（会覆盖search中的同名参数）
  hashParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}

export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());