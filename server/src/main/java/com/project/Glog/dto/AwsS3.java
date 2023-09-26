package com.project.Glog.dto;

public class AwsS3 {
    private String key;
    private String path;

    public AwsS3(String key, String path) {
        this.key = key;
        this.path = path;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}