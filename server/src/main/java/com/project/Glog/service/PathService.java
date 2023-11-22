package com.project.Glog.service;

import com.project.Glog.domain.Path;
import com.project.Glog.dto.PathDto;
import com.project.Glog.repository.PathRepository;
import com.project.Glog.repository.UserRepository;
import com.project.Glog.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class PathService {
    @Autowired
    private PathRepository pathRepository;
    @Autowired
    private UserRepository userRepository;

    public List<PathDto> makePathDtos(UserPrincipal userPrincipal) {
        List<PathDto> pathDtos = new ArrayList<>();
        List<Path> paths = pathRepository.findAllByUserId(userPrincipal.getId());
        paths = paths.stream()
                .sorted(Comparator.comparing(Path::getId).reversed())
                .toList();
        for (Path path : paths) {
            pathDtos.add(PathDto.of(path));
            if (pathDtos.size() == 20) {
                break;
            }
        }
        deleteOverRange(paths, pathDtos);
        return pathDtos;
    }

    private void deleteOverRange(List<Path> paths, List<PathDto> pathDtos) {
        for (Path path : paths) {
            if (!pathDtos.contains(PathDto.of(path))) {
                pathRepository.delete(path);
            }
        }
    }

    public void savePath(String pathName) {
        Path path = new Path();
        path.setInfluxPath(pathName);
        pathRepository.save(path);
    }
}
