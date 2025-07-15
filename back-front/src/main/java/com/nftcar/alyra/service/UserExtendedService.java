package com.nftcar.alyra.service;

import com.nftcar.alyra.domain.UserExtended;
import com.nftcar.alyra.repository.UserExtendedRepository;
import com.nftcar.alyra.service.dto.UserExtendedDTO;
import com.nftcar.alyra.service.mapper.UserExtendedMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link UserExtended}.
 */
@Service
@Transactional
public class UserExtendedService {

    private final Logger log = LoggerFactory.getLogger(UserExtendedService.class);

    private final UserExtendedRepository userExtendedRepository;

    private final UserExtendedMapper userExtendedMapper;

    public UserExtendedService(UserExtendedRepository userExtendedRepository, UserExtendedMapper userExtendedMapper) {
        this.userExtendedRepository = userExtendedRepository;
        this.userExtendedMapper = userExtendedMapper;
    }

    /**
     * Save a userExtended.
     *
     * @param userExtendedDTO the entity to save.
     * @return the persisted entity.
     */
    public UserExtendedDTO save(UserExtendedDTO userExtendedDTO) {
        log.debug("Request to save UserExtended : {}", userExtendedDTO);
        UserExtended userExtended = userExtendedMapper.toEntity(userExtendedDTO);
        userExtended = userExtendedRepository.save(userExtended);
        return userExtendedMapper.toDto(userExtended);
    }

    /**
     * Partially update a userExtended.
     *
     * @param userExtendedDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<UserExtendedDTO> partialUpdate(UserExtendedDTO userExtendedDTO) {
        log.debug("Request to partially update UserExtended : {}", userExtendedDTO);

        return userExtendedRepository
            .findById(userExtendedDTO.getId())
            .map(existingUserExtended -> {
                userExtendedMapper.partialUpdate(existingUserExtended, userExtendedDTO);

                return existingUserExtended;
            })
            .map(userExtendedRepository::save)
            .map(userExtendedMapper::toDto);
    }

    /**
     * Get all the userExtendeds.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<UserExtendedDTO> findAll() {
        log.debug("Request to get all UserExtendeds");
        return userExtendedRepository.findAll().stream().map(userExtendedMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one userExtended by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UserExtendedDTO> findOne(Long id) {
        log.debug("Request to get UserExtended : {}", id);
        return userExtendedRepository.findById(id).map(userExtendedMapper::toDto);
    }

    /**
     * Delete the userExtended by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete UserExtended : {}", id);
        userExtendedRepository.deleteById(id);
    }
}
